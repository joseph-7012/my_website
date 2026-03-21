const BACKEND_URL = "https://my-website-zrv5.onrender.com";

// ================= SIGNUP =================
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.text();
    alert(data);

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

  } catch (error) {
    alert("Server not connected");
  }
}

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

    if (data.success) {
      window.location.href = "portfolio.html";
    } else {
      alert("Invalid credentials");
    }

  } catch (error) {
    alert("Server not connected");
  }
}