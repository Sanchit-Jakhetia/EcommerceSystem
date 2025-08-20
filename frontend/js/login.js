const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");
const googleBtn = document.getElementById("googleLogin");

// 1. Handle JWT from Google redirect (?token=...)
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  localStorage.setItem("jwt", token);
  console.log("✅ Google login successful, token saved!");
  window.location.href = "/dashboard.html"; // redirect after Google login
}

// 2. Handle normal email/password login
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      message.textContent = `✅ Welcome back, ${data.user?.name || email}!`;
      message.className = "text-green-600 text-center mt-4 text-sm";

      // Save token if backend sends it
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }

      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/dashboard.html";

      }, 1000);
    } else {
      message.textContent = `❌ ${data.message || res.statusText || "Login failed"}`;
      message.className = "text-red-600 text-center mt-4 text-sm";
    }
  } catch (err) {
    console.error("🚨 Network/Server error:", err);
    message.textContent = "⚠️ Server not reachable.";
    message.className = "text-red-600 text-center mt-4 text-sm";
  }
});

// 3. Handle Google login button → start OAuth flow
googleBtn?.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/api/auth/google";
});
