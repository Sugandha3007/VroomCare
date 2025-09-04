
/* ---------- Demo Data ---------- */
const cars = [
  { id: 1, name: "Audi R8 Green", style: "Audi", type: "Auto", color: "Green", price: 285892, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJJzBG3Z39U6kUEqN7pFr6ruyBFh0y1tW_Q&s" },
  { id: 2, name: "Bentley Flying Spur", style: "Bentley", type: "Petrol", color: "White", price: 300000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sDsLuIa3tJRr1nAeoLvounVD7UeqpNJYKw&s" },
  { id: 3, name: "Bentley Flying Spur", style: "Bentley", type: "Petrol", color: "Blue", price: 300000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMbNQYSQqESETBE6itEPVQIJyHp1JgLVmTw&s" },
  { id: 4, name: "Audi's R8", style:'Bentley', type:'Petrol', color:'Blue', price: 358174, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYNqoxRSNY-rZn7s670F4abF-e2aMcpeyr5A&s" },
  { id: 5, name: "Lamborghini", style:'Lambo', type:'Petrol', color:'Orange', price: 845000, img:"https://www.shutterstock.com/image-photo/la-ca-usa-january-27-260nw-2581492157.jpg" },
  { id: 6, name: "Bentley Continental", style:'Bentley', type:'Petrol', color:'Grey', price: 312400, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULaXH-CSR7t4ay8nGVIGRT4M35Osbj5lyPA&s" }
];

/* ---------- Render Cards Dynamically ---------- */
const cardsEl = document.getElementById('cards');
function formatPrice(n){ return '$ ' + Number(n).toLocaleString(); }
function makeCard(car){
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
      <img src='${car.img}' alt='${escapeHTML(car.name)}' 
           style='max-height:110px;object-fit:contain' 
           onerror="this.style.opacity=0.35"/>
    </div>
    <div class='meta'>
      <div class='small'>Availability: 2-5</div>
      <div style='text-align:right'>
        <div class='price'>${formatPrice(car.price)}</div>
        <button class='btn' aria-label='Reserve ${escapeHTML(car.name)}' data-id='${car.id}'>Reserve</button>
      </div>
    </div>
  `;
  el.addEventListener('click', (e)=>{
    if(e.target.tagName.toLowerCase()==='button') return;
    showRecent(car);
  });
  el.querySelector('button').addEventListener('click', (ev)=>{
    ev.stopPropagation();
    alert('Reserve flow started for ' + car.name + ' (ID: ' + car.id + ')');
  });
  return el;
}

function renderList(list){
  cardsEl.innerHTML = '';
  list.forEach(c=> cardsEl.appendChild(makeCard(c)));
}

/* ---------- Right panel card ---------- */
const recentCard = document.getElementById('recentCard');
function showRecent(car){
  recentCard.innerHTML = `
    <div style='display:flex;gap:12px;align-items:center'>
      <img src='${car.img}' alt='' 
           style='width:84px;height:56px;object-fit:cover;border-radius:8px' />
      <div>
        <div style='font-weight:700'>${escapeHTML(car.name)}</div>
        <div class='small'>${escapeHTML(car.style)} • ${escapeHTML(car.type)}</div>
        <div style='color:var(--accent);font-weight:700;margin-top:6px'>${formatPrice(car.price)}</div>
      </div>
    </div>
    <div style='margin-top:12px;font-size:13px' class='muted'>
      Car Info: Steven Robert — stevenrobert@gmail.com
    </div>
  `;
  recentCard.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ---------- Simple Filters (search) ---------- */
document.getElementById('global-search').addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q) return renderList(cars);
  renderList(cars.filter(c => 
    (c.name + ' ' + c.style + ' ' + c.color).toLowerCase().includes(q)
  ));
});

/* ---------- Theme toggle (light/dark) ---------- */
const themeToggle = document.getElementById('theme-toggle');
let dark = false;
themeToggle.addEventListener('click', ()=> setTheme(!dark));
themeToggle.addEventListener('keydown', (e)=>{ 
  if(e.key==='Enter' || e.key===' ') setTheme(!dark); 
});
function setTheme(d){
  dark = !!d;
  if(dark){
    document.documentElement.style.setProperty('--bg','#0f1720');
    document.documentElement.style.setProperty('--card','#0b1220');
    document.documentElement.style.setProperty('--muted','#9aa6b3');
    document.documentElement.style.setProperty('--accent','#67a0ff');
    themeToggle.textContent = 'Dark';
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    document.documentElement.style.setProperty('--bg','#f7f9fc');
    document.documentElement.style.setProperty('--card','#ffffff');
    document.documentElement.style.setProperty('--muted','#8390a6');
    document.documentElement.style.setProperty('--accent','#2f66ff');
    themeToggle.textContent = 'Light';
    themeToggle.setAttribute('aria-pressed','false');
  }
}

/* ---------- Helpers ---------- */
function escapeHTML(s){ 
  return String(s).replace(/[&<>"']/g, 
    (c)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]
  ); 
}

/* ---------- Init ---------- */
renderList(cars);
showRecent(cars[0]);

document.querySelectorAll('nav li').forEach(li=>{
  li.addEventListener('keydown', e=>{ if(e.key==='Enter') li.click(); });
});
// Populate filters from Hero Page
window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("rentalFilters") || "{}");

  if (data.pickup) document.getElementById('location').value = data.pickup;
  if (data.pickupDate) document.getElementById('pickup').value = data.pickupDate;
  if (data.returnDate) document.getElementById('drop').value = data.returnDate;
  if (data.pickupTime) document.getElementById('picktime').value = data.pickupTime;
  if (data.dropTime) document.getElementById('droptime').value = data.dropTime;

  // Optionally clear the stored data after use
  // localStorage.removeItem("rentalFilters");
});
