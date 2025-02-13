// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
export const sendMail = async (req, res) => {
  const { otp, email, name } = req.query;
  console.log(otp,email,name);

  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jugrajsingh46984@gmail.com",
      pass: "sbjfkhvpserozbqp",
    },
  });
  try {
    if (!otp || !email || !name) {
      return res.status(400).send({ message: "otp email or name not given" });
    }
    let info = await transporter.sendMail({
      from: "jugrajsingh46984@gmail.com", 
      to: email, 
      subject: "varification code", 
      text: `Hey Mr./Ms. ${name} your otp is ${otp} thank you. 
      OPT IS VALID TILL 5 MINUTES ONLY`, 
      
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send({ success: true, info });
  } catch (error) {
    console.log(error);
  }
};
