const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bycrypt = require("bcryptjs");
const generateToken = require("../utils.js");

const userRoute = express.Router();

userRoute.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

module.exports = userRoute;
