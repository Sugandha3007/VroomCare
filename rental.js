// Supabase connection
const supabaseUrl = "https://telkieczsclasevsvull.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbGtpZWN6c2NsYXNldnN2dWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTI2NDAsImV4cCI6MjA3Njk4ODY0MH0.wC7L5i9TLWHoVmChweEZ9szZR9djPr0vkpGCgkiJeX8";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey, {
  db: { schema: "public" } // use your schema
});

// DOM Elements
const cardsEl = document.getElementById("cards");
const recentCard = document.getElementById("recentCard");
const searchInput = document.getElementById("global-search");

// Pagination state
const pageSize = 9;
let allCars = [];
let filteredCars = [];
let currentPage = 1;
let paginationEl = null;

// Helpers
function formatPrice(n) {
  return "$ " + Number(n).toLocaleString();
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

// Create single card element
function makeCard(car) {
  const img =
    (car.other_details && car.other_details.img) ||
    car.img ||
    "https://via.placeholder.com/150x100?text=No+Image";

  const el = document.createElement("article");
  el.className = "card";
  el.tabIndex = 0;
  el.innerHTML = `
    <div style='display:flex;justify-content:space-between;align-items:center'>
      <div>
        <h3>${escapeHTML(car.brand || "")} ${escapeHTML(car.model || "")}</h3>
        <div class='muted'>
          Type: ${escapeHTML(car.type || "")} &nbsp; • &nbsp;
          Color: ${escapeHTML(car.color || "")} &nbsp; • &nbsp;
          Year: ${car.year || ""}
        </div>
      </div>
      <div class='bookmark' title='Save'>🔖</div>
    </div>
    <div class='media'>
      <img src='${img}' alt='${escapeHTML(car.brand || "")} ${escapeHTML(car.model || "")}'
           style='max-height:110px;object-fit:contain'
           onerror="this.style.opacity=0.35"/>
    </div>
    <div class='meta'>
      <div class='small'>Availability: 2-5</div>
      <div style='text-align:right'>
        <div class='price'>${formatPrice(car.price_per_day || 0)}</div>
        <button class='btn' aria-label='Reserve ${escapeHTML(car.brand || "")} ${escapeHTML(car.model || "")}' data-id='${car.id}'>Reserve</button>
      </div>
    </div>
  `;

  el.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") return;
    showRecent(car);
  });

  el.querySelector("button").addEventListener("click", (ev) => {
    ev.stopPropagation();
    alert("Reserve flow started for " + (car.brand || "") + " (ID: " + car.id + ")");
  });

  return el;
}

// Render list with pagination
function renderList(list) {
  cardsEl.innerHTML = "";

  // Pagination slice
  const start = (currentPage - 1) * pageSize;
  const pagedList = list.slice(start, start + pageSize);

  if (!pagedList.length) {
    const noCard = document.createElement("div");
    noCard.className = "card no-match";
    noCard.style = "display:flex;align-items:center;justify-content:center;flex-direction:column;padding:26px 16px;background:#fffbe8;border:1.5px dashed #ffa500;color:#ff9800;";
    noCard.innerHTML = `
      <div style="font-size:2.7em;margin-bottom:6px">😕</div>
      <strong style="font-size:1.25em;margin-bottom:8px">Oops! No match found</strong>
      <div style="font-size:1em;color:#777;">Try a different search or check again.</div>
    `;
    cardsEl.appendChild(noCard);
  } else {
    pagedList.forEach((c) => cardsEl.appendChild(makeCard(c)));
    renderPaginationControls(list.length);
  }
}

// Render pagination controls dynamically
function renderPaginationControls(totalItems) {
  if (!paginationEl) {
    paginationEl = document.createElement("div");
    paginationEl.style.textAlign = "center";
    paginationEl.style.marginTop = "20px";
    cardsEl.parentNode.appendChild(paginationEl);
  }

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  paginationEl.innerHTML = `
    <button ${currentPage === 1 ? "disabled" : ""} id="prevBtn">&laquo; Prev</button>
    <span style="margin:0 12px">Page ${currentPage} of ${totalPages}</span>
    <button ${currentPage === totalPages ? "disabled" : ""} id="nextBtn">Next &raquo;</button>
  `;

  paginationEl.querySelector("#prevBtn").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderList(filteredCars);
    }
  };
  paginationEl.querySelector("#nextBtn").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderList(filteredCars);
    }
  };
}

// Show selected car in Recent Activity
function showRecent(car) {
  const img =
    (car.other_details && car.other_details.img) ||
    car.img ||
    "https://via.placeholder.com/150x100?text=No+Image";

  recentCard.innerHTML = `
    <div style='display:flex;gap:12px;align-items:center'>
      <img src='${img}' alt='' style='width:84px;height:56px;object-fit:cover;border-radius:8px' />
      <div>
        <div style='font-weight:700'>${escapeHTML(car.brand || "")} ${escapeHTML(car.model || "")}</div>
        <div class='small'>${escapeHTML(car.type || "")} • ${escapeHTML(car.color || "")}</div>
        <div style='color:var(--accent);font-weight:700;margin-top:6px'>${formatPrice(car.price_per_day || 0)}</div>
      </div>
    </div>
    <div style='margin-top:12px;font-size:13px' class='muted'>
      Car Info: Steven Robert — <a href="mailto:stevenrobert@gmail.com">stevenrobert@gmail.com</a>
    </div>
  `;
  recentCard.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Filter logic for search input - reset page and filteredCars
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) filteredCars = allCars;
  else {
    filteredCars = allCars.filter((c) => {
      const text = `${c.brand || ""} ${c.model || ""} ${c.color || ""} ${c.type || ""} ${c.year || ""}`.toLowerCase();
      return text.includes(q);
    });
  }
  currentPage = 1;
  renderList(filteredCars);
});

// Initial load
window.addEventListener("DOMContentLoaded", async () => {
  allCars = await fetchCars();
  filteredCars = allCars;
  renderList(filteredCars);
  if (allCars.length) showRecent(allCars[0]);
});

// fetchCars function remains unchanged from your original code.
async function fetchCars() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("type", "Car");

  if (error) {
    alert("Error fetching vehicles: " + error.message);
    console.error("Supabase error:", error);
    return [];
  }
  return data;
}
