require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ===== TEMP STORAGE (NO DATABASE) =====
let users = [];

// ===== EMAIL =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ===== SIGNUP =====
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.send("User already exists");
  }

  users.push({ username, password });
  res.send("Signup success");
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ===== ORDER EMAIL =====
app.post("/send-order", async (req, res) => {
  const { name, phone, order } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `NEW ORDER: ${name}`,
      text: `
Name: ${name}
Phone: ${phone}
Order: ${order}
Time: ${new Date().toLocaleString()}
`
    });

    res.send("Order sent");
  } catch (err) {
    console.error(err);
    res.send("Email error");
  }
});

// ===== DEFAULT =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ===== SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});