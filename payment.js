const pickupInput = document.getElementById("pickup");
const dropInput = document.getElementById("drop");

const daysText = document.getElementById("days");
const subtotalText = document.getElementById("subtotal");
const discountText = document.getElementById("discount");
const totalText = document.getElementById("total");
const payBtn = document.getElementById("pay-btn");

// Example: price per day (can be dynamic later)
const pricePerDay = 50;
const discount = 0;

function calculateTotal() {
  const pickupDate = new Date(pickupInput.value);
  const dropDate = new Date(dropInput.value);

  if (pickupDate && dropDate && dropDate > pickupDate) {
    const timeDiff = dropDate - pickupDate;
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const vehicleTotal = days * pricePerDay;

    daysText.textContent = `Total Days: ${days}`;
    subtotalText.textContent = `$${vehicleTotal}`;
    discountText.textContent = `-$${discount}`;
    totalText.textContent = `$${vehicleTotal - discount}`;
    payBtn.textContent = `Pay $${vehicleTotal - discount}`;
  } else {
    daysText.textContent = "Total Days: 0";
    subtotalText.textContent = "$0";
    discountText.textContent = "-$0";
    totalText.textContent = "$0";
    payBtn.textContent = "Pay $0";
  }
}

pickupInput.addEventListener("change", calculateTotal);
dropInput.addEventListener("change", calculateTotal);
