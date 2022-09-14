const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const utils = require("../utils.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const userRoute = express.Router();

const transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: "Shanelandingsender@hotmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMailForActivation = (user, token) => {
  transporter.sendMail(
    {
      from: "Shanelandingsender@hotmail.com",
      to: user.email,
      subject: "Account Activation",
      html: `
      <p>You have requested for account activation</p>
      <h3>click on this <a href="https://restaurant-landing-page-shane.herokuapp.com/activation/${token}">link</a> to activate your account </h3>`,
    },
    (error) => {
      if (error) {
        return res.send(error);
      } else {
        return res.status(200).send({ message: "Mail send" });
      }
    }
  );
};

userRoute.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const token = crypto.randomBytes(60).toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified === false) {
        user.activateToken = token;
        user.activateExpireToken = Date.now() + 1800000;

        await user.save();
        sendMailForActivation(user, token);

        return res.status(401).send({
          message:
            "A link has sent to your email, please verify your account first",
        });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        
        const refreshToken = utils.generateRefreshToken(user);

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

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
    const token = crypto.randomBytes(60).toString("hex");
    if (checkUser) {
      res.status(400).send({ message: "Email Already Exist" });
      return;
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      activateToken: token,
      activateExpireToken: Date.now() + 1800000,
    });
    const user = await newUser.save();

    sendMailForActivation(user, token);

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: utils.generateToken(user),
    });
  })
);

userRoute.post(
  "/reset-password",
  expressAsyncHandler(async (req, res) => {
    const token = crypto.randomBytes(60).toString("hex");

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .send({ message: "user does not exist with that email" });
    }

    user.resetToken = token;
    user.expireToken = Date.now() + 1800000;
    await user.save();

    transporter.sendMail(
      {
        from: "Shanelandingsender@hotmail.com",
        to: user.email,
        subject: "password reset",
        html: `
        <p>You have requested for password reset</p>
        <h3>click on this <a href="https://restaurant-landing-page-shane.herokuapp.com/resetpassword/${token}">link</a> to reset password </h3>`,
      },
      (error) => {
        if (error) {
          return res.send(error);
        } else {
          return res.status(200).send({ message: "Mail send" });
        }
      }
    );
  })
);

userRoute.post(
  "/new-password",
  expressAsyncHandler(async (req, res) => {
    const newPassword = req.body.password;
    const token = req.body.token;
    const user = await User.findOne({
      resetToken: token,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(422)
        .send({ message: "Session has expired, please try again" });
    } else if (bcrypt.compareSync(newPassword, user.password)) {
      return res
        .status(422)
        .send({ message: "You can't use the same password as the last one" });
    } else {
      user.password = bcrypt.hashSync(newPassword);
      user.resetToken = undefined;
      user.expireToken = undefined;

      await user.save();

      return res.status(200).send({ message: "password has been reset" });
    }
  })
);

userRoute.post(
  "/account-activation",
  expressAsyncHandler(async (req, res) => {
    const token = req.body.token;
    const user = await User.findOne({
      activateToken: token,
      activateExpireToken: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(422)
        .send({ message: "Session has expired, please try again" });
    } else {
      user.activateToken = undefined;
      user.activateExpireToken = undefined;
      user.verified = true;

      await user.save();

      return res.status(200).send({ message: "account is activated" });
    }
  })
);

userRoute.post(
  "/resend-activation",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (user.verified === true) {
        return res
          .status(400)
          .send({ message: "This account has already activated" });
      }
      const token = crypto.randomBytes(60).toString("hex");
      user.activateToken = token;
      user.activateExpireToken = Date.now() + 1800000;
      await user.save();
      sendMailForActivation(user, token);
      res.status(201).send({ message: "email has been sent" });
    } else {
      res.status(400).send({ message: "email does not exist" });
    }
  })
);

module.exports = userRoute;
