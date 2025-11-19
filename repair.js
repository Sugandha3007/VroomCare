// 1. Scroll Animation Logic
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".card, .about-text");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// 2. Popup Logic (Encapsulated in DOMContentLoaded for safety)
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popupTitle");
  const popupText = document.getElementById("popupText");
  const closePopup = document.getElementById("closePopup");
  const readMoreButtons = document.querySelectorAll(".read-more");

  // Data for the popup content
  const popupData = {
    1: {
      title: "Professional Standard",
      text: "Our mechanics follow internationally recognized repair protocols and use modern diagnostic systems to ensure your car receives the highest quality service."
    },
    2: {
      title: "Best Materials",
      text: "We only use certified oils, premium-grade parts, and eco-friendly materials to extend your vehicle’s life and boost performance."
    },
    3: {
      title: "Long Term Warranty",
      text: "Every service is backed by a long-term warranty that reflects our confidence in quality workmanship and reliability."
    }
  };

  // Add click event to "Read More" buttons
  readMoreButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      
      // Check if data exists for this ID to prevent errors
      if (popupData[id]) {
        const { title, text } = popupData[id];
        popupTitle.textContent = title;
        popupText.textContent = text;
        popup.style.display = "flex";
      }
    });
  });

  // Close Popup on 'X' click
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close Popup on clicking outside the box
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
// add to repair.js inside DOMContentLoaded or at bottom
const servicesBtn = document.getElementById('ourServicesBtn');
if (servicesBtn) {
  servicesBtn.addEventListener('click', (e) => {
    // as a fallback: allow normal navigation, but if something else intercepts, force location
    // small timeout avoids interfering with other handlers
    setTimeout(() => { window.location.href = './services.html'; }, 50);
  });
}
