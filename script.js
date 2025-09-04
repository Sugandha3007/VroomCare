// -------------------- NAVBAR SEARCH --------------------
const navbarSearch = document.querySelector(".navbar input");

navbarSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    alert(`🔍 You searched for: ${navbarSearch.value}`);
  }
});

// -------------------- HERO SEARCH BOX --------------------

// HERO SEARCH BOX
const heroSearchBtn = document.querySelector(".hero .search-box button");

heroSearchBtn.addEventListener("click", () => {
  const pickup = document.querySelector('.hero .search-box input[placeholder="Pick Up Address"]').value.trim();
  const pickupDate = document.getElementById('pickupDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const pickupTime = document.getElementById('pickupTime').value;
  const dropTime = document.getElementById('droptime').value;

  if (!pickup || !pickupDate || !returnDate || !pickupTime || !dropTime) {
    alert("⚠️ Please fill all fields");
    return;
  }

  // Save to localStorage
  localStorage.setItem("rentalFilters", JSON.stringify({
    pickup, pickupDate, returnDate, pickupTime, dropTime
  }));

  // Navigate to rental dashboard
  window.location.href = "crental.html"; 
});

// -------------------- HERO IMAGE SLIDESHOW --------------------
const heroImage = document.getElementById("heroImage");

// Array of car images (you can add more)
const heroImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70", // Car 1
  "https://images.unsplash.com/photo-1555215695-3004980ad54e",   // Car 2
  "https://content-hub.imgix.net/7aj32KAthRDtGhaWkAbztR/1ed7caf2633a5ec6d03770b1e991ebd7/taycan_wallpapers_thumbnail.jpg?w=811" // Car 3
];


let currentImageIndex = 0;

// Function to change image
function changeHeroImage() {
  currentImageIndex = (currentImageIndex + 1) % heroImages.length;
  heroImage.src = heroImages[currentImageIndex];
}

// Change image every 4 seconds
setInterval(changeHeroImage, 4000);
function changeHeroImage() {
  heroImage.style.opacity = 0;
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    heroImage.src = heroImages[currentImageIndex];
    heroImage.style.opacity = 1;
  }, 500);
}


// -------------------- TREND VEHICLES (Book Now buttons) --------------------
const trendButtons = document.querySelectorAll(".trend-card button");

trendButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".trend-card");
    const carName = card.querySelector("h3").innerText;
    const price = card.querySelector("p").innerText;

    alert(`✅ You selected: ${carName}\nPrice: ${price}\nProceeding to booking...`);
  });
});

// -------------------- PROMO TESLA --------------------
const promoBtn = document.querySelector(".promo-text button");
promoBtn.addEventListener("click", () => {
  alert("⚡ Tesla booking activated! You get 50% OFF 🎉");
});

// -------------------- REVIEW FORM --------------------
const reviewForm = document.getElementById("reviewForm");

reviewForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const review = document.getElementById("review").value.trim();

  // Simple email regex check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !review) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  alert(`✅ Thank you ${name}!\nYour review has been submitted.`);
  this.reset();
});
// -------------------- FLEET BOOKING --------------------
const fleetBookingBtn = document.querySelector(".fleet-box button");

fleetBookingBtn.addEventListener("click", () => {
  const eventAddress = document.querySelector('.fleet-box input[placeholder="Event Address"]').value.trim();
  const startDate = document.querySelector('.fleet-box input[placeholder="Start Date"]').value;
  const startTime = document.querySelector('.fleet-box input[placeholder="Start Time"]').value;
  const returnDate = document.querySelector('.fleet-box input[placeholder="Return Date"]').value;
  const returnTime = document.querySelector('.fleet-box input[placeholder="Return Time"]').value;
  const carCount = document.querySelector('.fleet-box input[placeholder="Number of Cars Needed"]').value;

  if (!eventAddress || !startDate || !startTime || !returnDate || !returnTime || !carCount) {
    alert("⚠️ Please fill in all fields for fleet booking.");
    return;
  }

  if (carCount <= 0) {
    alert("⚠️ Number of cars must be at least 1.");
    return;
  }

  alert(`🚗 Fleet Booking Confirmed!
📍 Event: ${eventAddress}
📅 From: ${startDate} at ${startTime}
📅 To: ${returnDate} at ${returnTime}
🚘 Cars Needed: ${carCount}`);
});
