const express = require("express");
const {
  testMail,
  attachmentsMail,
  sendMail,
  test,
} = require("../controllers/mailController");
const router = express.Router();

router.post("/test-mail", testMail);
router.post("/attachments-mail", attachmentsMail);
router.post("/send-mail", sendMail);

router.post("/", test);

module.exports = router;
