
// -------------------- HERO SEARCH BOX --------------------
const heroSearchBtn = document.getElementById("heroSearchBtn");

heroSearchBtn.addEventListener("click", () => {
  const pickupLocation = document.getElementById("pickupLocation").value.trim();
  const pickupDate = document.getElementById("pickupDate").value;
  const dropDate = document.getElementById("dropDate").value;
  const pickupTime = document.getElementById("pickupTime").value;
  const dropTime = document.getElementById("dropTime").value;

  if (!pickupLocation || !pickupDate || !dropDate || !pickupTime || !dropTime) {
    alert("⚠️ Please fill all fields before searching.");
    return;
  }

  // Save data to localStorage for rental.html
  localStorage.setItem("bikeRentalFilters", JSON.stringify({
    pickupLocation,
    pickupDate,
    dropDate,
    pickupTime,
    dropTime
  }));

  // Redirect to rental.html
  window.location.href = "rentalb.html";
});

// -------------------- HERO IMAGE SLIDESHOW --------------------
const heroImage = document.getElementById("heroImage");

// Array of car images (you can add more)
const heroImages = [
  "https://4kwallpapers.com/images/wallpapers/kawasaki-z-h2-superbikes-black-background-2020-1920x1080-833.jpg", // Car 1
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogK6iLBeNipsd6aNvUlYqltOqbAjwUXS0-Q&s",   // Car 2
  "https://png.pngtree.com/thumb_back/fh260/background/20230526/pngtree-bright-orange-electric-motorcycle-on-a-dark-background-image_2647362.jpg" // Car 3
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
