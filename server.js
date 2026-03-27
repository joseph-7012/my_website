const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ================= DB =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

// ================= EMAIL =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manaleltraders.com@gmail.com",
    pass: "wuimoqthfivprrdb"
  }
});

// ================= AUTH =================

// SIGNUP
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.send("User already exists");
      res.send("User added");
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (result.length > 0) {
        res.json({ message: "Login successful" });
      } else {
        res.json({ message: "Invalid credentials" });
      }
    }
  );
});

// ================= ORDER =================

app.post("/send-order", async (req, res) => {
  const { name, phone, order } = req.body;

  try {
    await transporter.sendMail({
      from: "manaleltraders.com@gmail.com",
      to: "manaleltraders.com@gmail.com",
      subject: `🌾 NEW ORDER: ${name}`,
      text: `
Name: ${name}
Phone: ${phone}
Order: ${order}
Time: ${new Date().toLocaleString()}
`
    });

    console.log("✅ Order Email Sent");
    res.send("Order Sent Successfully");

  } catch (error) {
    console.error(error);
    res.status(500).send("Email Error");
  }
});

// ================= ROUTES =================

// default page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("🚀 FULL SERVER RUNNING → http://localhost:5000");
});