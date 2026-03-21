// NO BACKEND_URL NEEDED

// ================= SIGNUP =================
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/signup", {   // ✅ FIXED
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.text();
    alert(data);

  } catch (error) {
    alert("Server waking up... try again in 20 seconds");
  }
}

// ================= LOGIN =================
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {   // ✅ FIXED
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
    alert("Server waking up... try again in 20 seconds");
  }
}