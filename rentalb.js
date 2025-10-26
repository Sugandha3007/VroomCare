// Supabase connection
const supabaseUrl = "https://telkieczsclasevsvull.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbGtpZWN6c2NsYXNldnN2dWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTI2NDAsImV4cCI6MjA3Njk4ODY0MH0.wC7L5i9TLWHoVmChweEZ9szZR9djPr0vkpGCgkiJeX8"; // Use your actual key!

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey, {
  db: { schema: "public" }
});

// DOM Elements
const cardsEl = document.getElementById('cards');
const recentCard = document.getElementById('recentCard');
const searchInput = document.getElementById('global-search');

// Pagination container
let paginationEl;

// Two-wheeler types supported
const twoWheelerTypes = ['Bike', 'Scooty', 'Bullet', 'Electric'];

// Pagination state
const pageSize = 9;
let allBikes = [];
let currentPage = 1;
let filteredBikes = [];

// Helper: HTML escape
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Helper: price formatting in INR
function formatPrice(n) {
  return '₹ ' + Number(n).toLocaleString();
}

// Fetch two-wheelers of specified types from Supabase
async function fetchTwoWheelers() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .in("type", twoWheelerTypes);

  if (error) {
    alert("Error fetching vehicles: " + error.message);
    console.error("Supabase error:", error);
    return [];
  }

  // Map data for frontend usage
  return data.map(vehicle => ({
    id: vehicle.id,
    name: vehicle.model || vehicle.name || "",
    style: vehicle.brand || "",
    type: vehicle.type || "",
    color: vehicle.color || "",
    price: vehicle.price_per_day || vehicle.price || 0,
    img: (vehicle.other_details?.img) || vehicle.img || "https://via.placeholder.com/150x100?text=No+Image"
  }));
}

// Create card element for a bike
function makeCard(car) {
  const el = document.createElement('article');
  el.className = 'card';
  el.tabIndex = 0;
  el.innerHTML = `
    <div style='display:flex;justify-content:space-between;align-items:center'>
      <div>
        <h3>${escapeHTML(car.name)}</h3>
        <div class='muted'>
          Style: ${escapeHTML(car.style)} &nbsp; • &nbsp; 
          Type: ${escapeHTML(car.type)} &nbsp; • &nbsp; 
          Color: ${escapeHTML(car.color)}
        </div>
      </div>
      <div class='bookmark' title='Save'>🔖</div>
    </div>
    <div class='media'>
      <img src='${car.img}' alt='${escapeHTML(car.name)}' style='max-height:110px;object-fit:contain' onerror="this.style.opacity=0.35"/>
    </div>
    <div class='meta'>
      <div class='small'>Availability: 2-5</div>
      <div style='text-align:right'>
        <div class='price'>${formatPrice(car.price)}</div>
        <button class='btn' aria-label='Reserve ${escapeHTML(car.name)}' data-id='${car.id}'>Reserve</button>
      </div>
    </div>
  `;
  
  el.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') showRecent(car);
  });
  el.querySelector('button').addEventListener('click', ev => {
    ev.stopPropagation();
    alert('Reserve flow started for ' + car.name + ' (ID: ' + car.id + ')');
  });
  return el;
}

// Render list of bikes with pagination slice
function renderList(list) {
  cardsEl.innerHTML = "";

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
    pagedList.forEach(c => cardsEl.appendChild(makeCard(c)));
    renderPaginationControls(list.length);
  }
}

// Render pagination controls under the cards container
function renderPaginationControls(totalItems) {
  if (!paginationEl) {
    paginationEl = document.createElement('div');
    paginationEl.style.textAlign = 'center';
    paginationEl.style.marginTop = '20px';
    cardsEl.parentNode.appendChild(paginationEl);
  }

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  paginationEl.innerHTML = `
    <button ${currentPage === 1 ? 'disabled' : ''} id="prevBtn">&laquo; Prev</button>
    <span style="margin:0 12px">Page ${currentPage} of ${totalPages}</span>
    <button ${currentPage === totalPages ? 'disabled' : ''} id="nextBtn">Next &raquo;</button>
  `;

  paginationEl.querySelector('#prevBtn').onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderList(filteredBikes);
    }
  };
  paginationEl.querySelector('#nextBtn').onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderList(filteredBikes);
    }
  };
}

// Show selected bike in recent activity panel
function showRecent(car){
  recentCard.innerHTML = `
    <div style='display:flex;gap:12px;align-items:center'>
      <img src='${car.img}' alt='' style='width:84px;height:56px;object-fit:cover;border-radius:8px'/>
      <div>
        <div style='font-weight:700'>${escapeHTML(car.name)}</div>
        <div class='small'>${escapeHTML(car.style)} • ${escapeHTML(car.type)}</div>
        <div style='color:var(--accent);font-weight:700;margin-top:6px'>${formatPrice(car.price)}</div>
      </div>
    </div>
    <div style='margin-top:12px;font-size:13px' class='muted'>
      Rider Info: Jhony Leaver — <a href="mailto:johnyleaver@gmail.com">johnyleaver@gmail.com</a>
    </div>
  `;
  recentCard.scrollIntoView({behavior:'smooth',block:'center'});
}

// Search input handler supporting filtering and resetting pagination
searchInput.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    filteredBikes = allBikes;
  } else {
    filteredBikes = allBikes.filter(c => (c.name + ' ' + c.style + ' ' + c.color + ' ' + c.type).toLowerCase().includes(q));
  }
  currentPage = 1;
  renderList(filteredBikes);
});

// Initial page load
window.addEventListener('DOMContentLoaded', async () => {
  allBikes = await fetchTwoWheelers();
  filteredBikes = allBikes;
  renderList(filteredBikes);
  if (allBikes.length) showRecent(allBikes[0]);
});
