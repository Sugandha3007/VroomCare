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

  // ----- Booking flow enhancement for popup -----
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popupTitle');
  const popupText = document.getElementById('popupText');
  const closePopup = document.getElementById('closePopup');

  const serviceView = document.getElementById('service-view');
  const bookingForm = document.getElementById('booking-form');
  const confirmationView = document.getElementById('confirmation-view');

  const openBookingBtn = document.getElementById('openBooking'); // inside service view
  const backToDetailsBtn = document.getElementById('backToDetails');
  const submitBookingBtn = document.getElementById('submitBooking');
  const doneBtn = document.getElementById('doneBtn');

  // helper to switch views
  function showView(viewId) {
    [serviceView, bookingForm, confirmationView].forEach(v => {
      if (!v) return;
      v.style.display = (v.id === viewId) ? (v.tagName === 'FORM' ? 'block' : 'block') : 'none';
    });
    // ensure focus on first focusable element in view
    setTimeout(() => {
      const view = document.getElementById(viewId);
      if (!view) return;
      const first = view.querySelector('input, textarea, button, a');
      if (first) first.focus({ preventScroll: true });
    }, 10);
  }

  // close popup helper
  function closeModal() {
    if (popup) popup.style.display = 'none';
    // reset to default view for next open
    showView('service-view');
    // clear form
    if (bookingForm) bookingForm.reset();
  }

  // close handlers
  if (closePopup) closePopup.addEventListener('click', (e) => { e.preventDefault(); closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  window.addEventListener('click', (e) => { if (e.target === popup) closeModal(); });

  // When "Book This Service" is clicked in the service view, show form
  if (openBookingBtn) {
    openBookingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('booking-form');
    });
  }

  // back to details
  if (backToDetailsBtn) {
    backToDetailsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('service-view');
    });
  }

  // submit booking (client-side validation + fake submit)
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const vehicle = document.getElementById('vehicleModel').value.trim() || 'Not specified';
      const date = document.getElementById('serviceDate').value;
      const time = document.getElementById('serviceTime').value;
      const address = document.getElementById('custAddress').value.trim() || 'Not specified';

      // basic validation
      if (!name || !phone || !date || !time) {
        alert('Please fill all required fields (Name, Phone, Date, Time).');
        return;
      }
      if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      // Prepare confirmation text
      const serviceName = popupTitle.textContent || 'Selected Service';
      const confirmationText = `
        ${serviceName} booked for ${name} on ${date} at ${time}.
        Vehicle: ${vehicle}.
        Contact: ${phone}.
        Address/Pickup: ${address}.
      `;

      // Show confirmation (simulate server call)
      const confirmationEl = document.getElementById('confirmation-text');
      if (confirmationEl) {
        confirmationEl.textContent = confirmationText;
      }
      showView('confirmation-view');

      // Optionally: store booking in localStorage for demo
      try {
        const bookings = JSON.parse(localStorage.getItem('vroom_bookings') || '[]');
        bookings.push({
          service: serviceName,
          name, phone, vehicle, date, time, address,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('vroom_bookings', JSON.stringify(bookings));
      } catch (err) {
        // silent fail
      }
    });
  }

  // Done button closes modal
  if (doneBtn) {
    doneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Keep existing "read-more" popup logic intact -- when an item opens the popup, ensure we start on details view
  const readMoreButtons = document.querySelectorAll('.read-more');
  readMoreButtons.forEach(button => {
    // existing handler from your file showed popup and set texts — we ensure view reset
    button.addEventListener('click', (ev) => {
      // existing code likely already sets popupTitle/popupText and displays popup
      setTimeout(() => showView('service-view'), 10);
    });
  });

});
