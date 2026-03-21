// PAGE SWITCHING WITH NAV HIGHLIGHTING
function showPage(pageId, element) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));

  if (element) {
    element.classList.add("active");
  } else {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      if (link.getAttribute('onclick').includes(pageId)) {
        link.classList.add("active");
      }
    });
  }

  window.scrollTo(0, 0);
}

// IMAGE SLIDER
let images = ["buffimage.jpg", "gemimage.jpg"];
let index = 0;

function showSlide() {
  const slide = document.getElementById("slide");
  if (slide) {
    slide.style.opacity = 0;
    setTimeout(() => {
      slide.src = images[index];
      slide.style.opacity = 1;
    }, 200);
  }
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

// SEND ORDER (FINAL FIXED)
async function sendOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const order = document.getElementById("order").value;
  const btn = document.getElementById("submit-btn");

  if (!name || !phone || !order) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  const originalText = btn.innerText;
  btn.innerText = "Sending...";
  btn.disabled = true;

  try {
    // ✅ FIXED (same server now)
    const res = await fetch("/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, order })
    });

    const msg = await res.text();

    if (res.ok) {
      alert("✅ " + msg);
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("order").value = "";
    } else {
      alert("❌ " + msg);
    }

  } catch (err) {
    console.error(err);
    alert("🚀 Server connection error.");
  } finally {
    btn.innerText = originalText;
    btn.disabled = false;
  }
}

// INITIAL LOAD
window.onload = showSlide;