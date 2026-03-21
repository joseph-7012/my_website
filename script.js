const BACKEND_URL = "https://my-website-zrv5.onrender.com";

// ================= LOGIN =================
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log("RESPONSE:", data); // 👈 DEBUG

    if (data.success) {
      alert("Login success");
      window.location.href = "portfolio.html";
    } else {
      alert("Invalid credentials");
    }

  } catch (err) {
    console.error(err);
    alert("Server not connected");
  }
}