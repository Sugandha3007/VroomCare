/* ---------- Demo Data ---------- */
const bikes = [
    { id: 1, name: "Yamaha R1", style: "Yamaha", type: "Sport", color: "Blue", price: 18000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq21pG4HjAOshD80RQpwZUcsPp4tvwK6n7vg&s" },
    { id: 2, name: "Honda CBR500R", style: "Honda", type: "Sport", color: "Red", price: 12000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnTRYhrjf4_fZjtgaMe_tE26ElBAMH6RnrkA&s" },
    { id: 3, name: "KTM Duke 390", style: "KTM", type: "Naked", color: "Orange", price: 6000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6UqbMxRtu4ZMiwPzGFHAWwvtPTr3jSfa9A&s" },
    { id: 4, name: "Suzuki GSX-R600", style: "Suzuki", type: "Sport", color: "White", price: 11000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ0b8MImao_Zl7cofxbv7DTGTA7X3Slfl3GQ&s" },
    { id: 5, name: "Ducati Panigale", style: "Ducati", type: "Sport", color: "Red", price: 25000, img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTkiSQpv0hcymDHb0n2LPBJC6G-Rbaxq2BBjR8e16Hm7toRM9m4Ss49v5lYHDTEyrPJVxwwsTJsNbXqc3cexTbMxHBYJvOPfaB3uxCCTQ" }
];

/* ---------- Helpers ---------- */
function escapeHTML(s){ 
  return String(s).replace(/[&<>"']/g, 
    c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]
  ); 
}
function formatPrice(n){ return '$ ' + Number(n).toLocaleString(); }

/* ---------- Render Cards Dynamically ---------- */
const cardsEl = document.getElementById('cards');
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
  el.addEventListener('click', (e)=>{ if(e.target.tagName!=='BUTTON') showRecent(car); });
  el.querySelector('button').addEventListener('click', ev=>{
    ev.stopPropagation();
    alert('Reserve flow started for ' + car.name + ' (ID: ' + car.id + ')');
  });
  return el;
}
function renderList(list){
  cardsEl.innerHTML = '';
  list.forEach(c=> cardsEl.appendChild(makeCard(c)));
}

/* ---------- Recent Activity ---------- */
const recentCard = document.getElementById('recentCard');
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
      Rider Info: Jhony Leaver — johnyleaver@gmail.com
    </div>
  `;
  recentCard.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ---------- Search Filter ---------- */
document.getElementById('global-search').addEventListener('input', e=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q) return renderList(bikes);
  renderList(bikes.filter(c=> (c.name+' '+c.style+' '+c.color).toLowerCase().includes(q)));
});

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
let dark=false;
function setTheme(d){
  dark=!!d;
  if(dark){
    document.documentElement.style.setProperty('--bg','#0f1720');
    document.documentElement.style.setProperty('--card','#0b1220');
    document.documentElement.style.setProperty('--muted','#9aa6b3');
    document.documentElement.style.setProperty('--accent','#67a0ff');
    themeToggle.textContent='Dark';
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    document.documentElement.style.setProperty('--bg','#f7f9fc');
    document.documentElement.style.setProperty('--card','#ffffff');
    document.documentElement.style.setProperty('--muted','#8390a6');
    document.documentElement.style.setProperty('--accent','#2f66ff');
    themeToggle.textContent='Light';
    themeToggle.setAttribute('aria-pressed','false');
  }
}
themeToggle.addEventListener('click', ()=>setTheme(!dark));
themeToggle.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') setTheme(!dark); });

/* ---------- Init ---------- */
renderList(bikes);
showRecent(bikes[0]);
document.querySelectorAll('nav li').forEach(li=>{ li.addEventListener('keydown', e=>{ if(e.key==='Enter') li.click(); }); });

/* ---------- Populate filters from Hero Page ---------- */
window.addEventListener('DOMContentLoaded', () => {

  const data = JSON.parse(localStorage.getItem("bikeRentalFilters") || "{}");

  if(data.pickupLocation) document.getElementById('location').value = data.pickupLocation;
  if(data.pickupDate) document.getElementById('pickup').value = data.pickupDate;
  if(data.dropDate) document.getElementById('drop').value = data.dropDate;
  if(data.pickupTime) document.getElementById('picktime').value = data.pickupTime;
  if(data.dropTime) document.getElementById('droptime').value = data.dropTime;

});
