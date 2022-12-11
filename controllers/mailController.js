const nodemailer = require("nodemailer");
const multer = require("multer");

// Multer file storage
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./attachments");
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

// Middleware to get attachments
const attachmentUpload = multer({
  storage: Storage,
}).single("attachment");

const transporter = nodemailer.createTransport({
  port: process.env.CONFIG_PORT,
  host: process.env.CONFIG_HOST,
  auth: {
    user: process.env.CONFIG_USER,
    pass: process.env.CONFIG_PASS,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

const test = async (req, res) => {
  attachmentUpload(req, res, async function (error) {
    if (error) {
      res
        .status(500)
        .send({ message: "Error Managing File", message_id: error });
    }
    const { to, subject, message, html } = req.body;
    const mailData = {
      from: process.env.CONFIG_USER,
      to: to,
      text: message,
      subject: subject,
      html: html,
      attachments: req.file?.path,
    };
    return res.status(200).send(mailData);
  });
};

const testMail = async (req, res) => {
  attachmentUpload(req, res, async function (error) {
    if (error) {
      res
        .status(500)
        .send({ message: "Error Managing File", message_id: error });
    }
    const { to, subject, message, html } = req.body;
    const attachmentPath = req.file?.path;
    const mailData = {
      from: process.env.CONFIG_USER,
      to: to,
      text: message,
      subject: subject,
      html: html,
    };
    if (attachmentPath) {
      mailData.attachments = [
        {
          path: attachmentPath,
        },
      ];
    }

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        res.status(500).send({ message: "Mail not send", message_id: error });
      }
      return res.status(200).redirect("/success.html");
      // res
      //   .status(200)
      //   .send({ message: "Mail send", messsage_id: info.messageId });
    });
  });
};

module.exports = { testMail, test };
