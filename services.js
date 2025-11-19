// Animation on Scroll
window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".card");
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add("visible");
      }
    });
});

// Trigger animation on load for items already in view
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".card");
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add("visible");
        }
    });
});

// Popup Logic
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popupTitle");
    const popupText = document.getElementById("popupText");
    const closePopup = document.getElementById("closePopup");
    const readMoreButtons = document.querySelectorAll(".read-more");
  
    const serviceData = {
      s1: {
        title: "Engine Diagnostics",
        text: "We use state-of-the-art OBD-II scanners to read engine error codes. We inspect spark plugs, fuel injectors, and combustion systems to restore power and efficiency."
      },
      s2: {
        title: "Oil & Fluids",
        text: "Our package includes full synthetic oil replacement, new oil filter, and top-ups for coolant, brake fluid, and power steering fluid to prevent wear and tear."
      },
      s3: {
        title: "Brake Repair",
        text: "Comprehensive brake service including pad replacement, rotor resurfacing or replacement, brake line bleeding, and ABS system checks."
      },
      s4: {
        title: "Tires & Wheels",
        text: "We offer computerized wheel alignment, tire rotation, balancing, and puncture repair. We stock major brands for all vehicle types."
      },
      s5: {
        title: "Battery Service",
        text: "Don't get stranded. We test battery voltage, clean terminals to prevent corrosion, and install new high-performance batteries with warranty."
      },
      s6: {
        title: "A/C Repair",
        text: "AC recharge, leak detection, and compressor repair. We ensure your cabin stays cool in summer and the defroster works perfectly in winter."
      }
    };
  
    readMoreButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        if(serviceData[id]) {
            const { title, text } = serviceData[id];
            popupTitle.textContent = title;
            popupText.textContent = text;
            popup.style.display = "flex";
        }
      });
    });
  
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  });