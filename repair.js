window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".card, .about-text");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
document.querySelectorAll('.card a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('popup').style.display = 'flex';
  });
});

document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === document.getElementById('popup')) {
    document.getElementById('popup').style.display = 'none';
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popupTitle");
  const popupText = document.getElementById("popupText");
  const closePopup = document.getElementById("closePopup");
  const readMoreButtons = document.querySelectorAll(".read-more");

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

  readMoreButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      const { title, text } = popupData[id];
      popupTitle.textContent = title;
      popupText.textContent = text;
      popup.style.display = "flex";
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