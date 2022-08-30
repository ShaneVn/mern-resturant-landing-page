const nodemailer = require("nodemailer");
const express = require("express");
const sendEmailRoute = express.Router();


const transporter = nodemailer.createTransport({
    service : "Hotmail",
    auth: {
        user: 'Shanelandingsender@hotmail.com',
        pass: process.env.EMAIL_PASSWORD,
    },

});

sendEmailRoute.post("/sendemail", async (req, res) => {
  const { email } = await req.body;
 

  const mailOptions = {
    from: "Shanelandingsender@hotmail.com",
    to: email,
    subject: "Your Order is read",
    text: "Thanks for Ordering with us!",

  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
      return
    } else {
      res.status(200).send({message:"Mail send"})
    }
  });
});


sendEmailRoute.post("/receivemail", async (req, res) => {
  const {name, email, message } = await req.body;
 

  const mailOptions = {
    from: "Shanelandingsender@hotmail.com",
    to: "shanereact115@gmail.com",
    subject: "Message from customer",
    text: `name:${name} \nemail:${email} \nmessage:${message}`,

  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
      return
    } else {
      res.status(200).send({message:"Mail send"})
    }
  });
});



module.exports = sendEmailRoute;
