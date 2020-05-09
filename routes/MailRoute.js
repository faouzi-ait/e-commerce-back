const router = require("express").Router();
const mailController = require("../controller/MailController");

router.post("/contact/message", mailController.sendEmail);

module.exports = router;
