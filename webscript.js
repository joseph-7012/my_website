import { EnvironmentVariables } from "./environment_variables.js";

// PAGE SWITCHING WITH NAV HIGHLIGHTING
window.showPage = function showPage(pageId, element) {
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

window.nextSlide = function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

window.prevSlide = function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

// SEND ORDER (FINAL FIXED)
window.sendOrder = async function sendOrder() {
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

    let response;

    await fetch(EnvironmentVariables.SERVER.SEND_ORDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, order })
    })
      .then(res => response = res);

    const msg = await response.text();

    if (response.ok) {
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