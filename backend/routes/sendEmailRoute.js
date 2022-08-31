const nodemailer = require("nodemailer");
const express = require("express");

const expressAsyncHandler = require("express-async-handler");

const sendEmailRoute = express.Router();

const transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: "Shanelandingsender@hotmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

sendEmailRoute.post(
  "/sendemail",
  expressAsyncHandler(async (req, res) => {
    const { email, order, total, firstName } = await req.body;

    const mailOptions = {
      from: "Shanelandingsender@hotmail.com",
      to: email,
      subject: `Order is ready for ${firstName}`,
      text: `Thanks for Ordering with us! \nYour Orders:${order} \nYour Total:$${total}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.send(error);
      } else {
        return res.status(200).send({ message: "Mail send" });
      }
    });
  })
);

sendEmailRoute.post(
  "/receivemail",
  expressAsyncHandler(async (req, res) => {
    const { name, email, message } = await req.body;

    const mailOptions = {
      from: "Shanelandingsender@hotmail.com",
      to: "shanereact115@gmail.com",
      subject: "Message from customer",
      text: `name:${name} \nemail:${email} \nmessage:${message}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.send(error);
      } else {
        return res.status(200).send({ message: "Mail send" });
      }
    });
  })
);

module.exports = sendEmailRoute;
