// server.js
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe("your-secret-key");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Налаштування для обробки JSON-запитів
app.use(bodyParser.json());

// Сервірування статичних файлів (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/payment", async (req, res) => {
  const { id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: 5000, // Сума у найменшій валюті (наприклад, копійки для гривні)
      currency: "usd",
      payment_method: id,
      confirm: true,
    });

    res.send({ message: "Payment successful", payment });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
