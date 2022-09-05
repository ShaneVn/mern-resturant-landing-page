const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const product = require("./data.js");
const userRoute = require("./routes/userRoute.js");
const seedRouter = require("./routes/seedRoute.js");
const sendEmailRoute = require("./routes/sendEmailRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_KEY);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// get products from API
app.get("/api/product", (req, res) => {
  res.send(product);
});

// API for payment
app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;

  const payment = await stripe.paymentIntents.create({
    amount: Math.round(total.toFixed(2)*100),
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// combine different middlewares from different routes
app.use("/api/seed", seedRouter);
app.use("/api/users", userRoute);
app.use("/api/email", sendEmailRoute);
app.use("/api/order", orderRoute);

// handle custom error message or when throw new Error('') for debugging
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use(express.static(path.join(__dirname, "../frontend", "build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend", "build", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
