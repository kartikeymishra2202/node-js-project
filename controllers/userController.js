import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import formData from "form-data";
import Mailgun from "mailgun.js";
import randomstring from "randomstring";

dotenv.config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_API_URL,
});

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    return next("Please provide all fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

// Method for sending mail
const sendResetPasswordMail = async (name, email, token) => {
  try {
    const domain = process.env.MAILGUN_DOMAIN;
    const data = {
      from: `Excited User <mailgun@${domain}>`,
      to: email,
      subject: "For Reset Password",
      html: `<p>Hi ${name},</p>
             <p>Please copy the link below and reset your password:</p>
             <a href="http://127.0.0.1:8080/api/v1/auth/reset-password?token=${token}">Reset Password</a>`,
    };
    console.log("Sending email with data:", data);
    await mg.messages.create(domain, data);
    console.log("Mail sent successfully");
  } catch (error) {
    console.log(error.message);
  }
};

// Forget password
export const forgetUserController = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(`Email received: ${email}`);
    const userData = await userModel.findOne({ email });
    console.log(`User data: ${userData}`);

    if (userData) {
      const randomString = randomstring.generate();
      await userModel.updateOne({ email }, { $set: { token: randomString } });
      sendResetPasswordMail(userData.name, userData.email, randomString);
      res.status(200).send({
        success: true,
        message: "Please check your email inbox and reset password",
      });
    } else {
      res
        .status(200)
        .send({ success: true, message: "This email does not exist." });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// Get user data
export const getUserController = async (req, res, next) => {
  try {
    const user = await userModel.findById({ _id: req.body.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error: error.message,
    });
  }
};
