const express = require("express");
const User = require("../../models/User");
const formatedResetHTMl = require("../../utils/reset-email-template");
const router = express.Router();
const bcrypt = require("bcrypt");

const SENDGRID_API_KEY = process.env.SEND_GRID_API;

//@ts-ignore
sgMail.setApiKey(SENDGRID_API_KEY);

// regular express to verify email format
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let token = "";
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)];
}

router.post("/start", async (res, res, next) => {
  try {
    //get filds from request
    const { email } = req.body;

    // update user doc and remove the code
    await User.findOneAndUpdate(
      { email: email },
      {
        resetPasswordCode: token,
      }
    );

    const msg = {
      to: email, // Change to your recipient
      from: "trewmane@gmail.com", // Change to your verified sender
      subject: "Email Verification",
      text: "verify your email",
      html: formatedResetHTMl(
        `https://www.trolliey.com/password-reset/${token}`
      ),
    };
    await sgMail.send(msg);

    return res
      .status(200)
      .send({ message: "Check your email for a reset password!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/reset", async (res, res, next) => {
  try {
    //get filds from request
    const { id, password, confirm_passsword } = req.body;

    if (password.length < 6) {
      return res.status(400).send({ message: "Passwords too short!" });
    }

    if (password !== confirm_passsword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    await User.findOneAndUpdate(
      {
        resetPasswordCode: id,
      },
      {
        password: bcrypt.hashSync(password, 12),
      }
    );

    return res.status(200).send({ message: "Password changed!" });
  } catch (error) {
    return res.status(500).send({message: error})
  }
});

module.exports = router;
