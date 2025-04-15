
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "Godaddy",
  auth: {
    user: "contactus@dayaheadinc.com",
    pass: "WelC0me.@CUs+"
  }
});

app.post("/api/send", (req, res) => {
  const { from, to, subject, message } = req.body;

  console.log("Incoming email request:", { from, to, subject, message });

  const mailOptions = {
    from,
    to,
    subject,
    html: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending mail:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
    res.status(200).json({ message: "Email sent successfully", info });
  });
});


const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
