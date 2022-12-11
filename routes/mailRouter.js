const express = require("express");
const { testMail, test } = require("../controllers/mailController");
const router = express.Router();

router.post("/test-mail", testMail);
router.post("/", test);

module.exports = router;
