require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ===== TEMP STORAGE =====
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

  const exists = users.find(u => u.username === username);
  if (exists) return res.send("User exists");

  users.push({ username, password });
  res.send("Signup success");
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  res.json({ success: !!user });
});

// ===== ORDER EMAIL =====
app.post("/send-order", async (req, res) => {
  const { name, phone, order } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `ORDER: ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nOrder: ${order}`
    });

    res.send("Order sent");
  } catch {
    res.send("Email error");
  }
});

// ===== DEFAULT =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT || 10000, () => {
  console.log("SERVER RUNNING");
});