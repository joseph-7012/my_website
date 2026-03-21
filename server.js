require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ===== DATABASE (RAILWAY) =====
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error("❌ DB ERROR:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ===== EMAIL =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ===== CREATE TABLE (AUTO) =====
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
  )
`);

// ===== SIGNUP =====
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("User exists or error");
      }
      res.send("Signup success");
    }
  );
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) return res.json({ success: false });

      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
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
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});