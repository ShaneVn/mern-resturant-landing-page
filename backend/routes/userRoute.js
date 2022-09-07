const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const utils = require("../utils.js");

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
          token: utils.generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRoute.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const checkUser = await User.findOne({ email: req.body.email });

    if (checkUser) {
      res.status(400).send({ message: "Email Already Exist" });
      return;
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: utils.generateToken(user),
    });
  })
);

module.exports = userRoute;
