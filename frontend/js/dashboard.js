// dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in, go back to login
    window.location.href = "http://127.0.0.1:5500/login.html";
    return;
  }

  // Show basic user info
  document.getElementById("welcomeName").textContent = `Welcome, ${user.name}`;
  document.getElementById("email").textContent = user.email;
  document.getElementById("role").textContent = user.role;

  // Show addresses
  const addressList = document.getElementById("addresses");
  user.addresses.forEach(addr => {
    const li = document.createElement("li");
    li.textContent = `${addr.label}: ${addr.line1}, ${addr.city}, ${addr.state}`;
    addressList.appendChild(li);
  });

  // Show phone numbers
  const phoneList = document.getElementById("phones");
  user.phoneNumbers.forEach(ph => {
    const li = document.createElement("li");
    li.textContent = `${ph.label}: ${ph.number}`;
    phoneList.appendChild(li);
  });
});
