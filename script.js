import { EnvironmentVariables } from "./environment_variables.js";

window.signup = async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await fetch(EnvironmentVariables.SERVER.SIGNUP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => console.log(res));

  // clear fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

window.login = async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let response;

  await fetch(EnvironmentVariables.SERVER.LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => response = res);

  const data = await response.json();

  if (data.message === "Login successful") {
    window.location.href = "portfolio.html";
  } else {
    alert("Invalid credentials");
  }
}