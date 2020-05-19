require("../services/AuthenticationService");
const router = require("express").Router();
const passport = require("passport");
const mailController = require("../controller/MailController");

const ProtectedRoute = passport.authenticate("jwt", { session: false });

router.post("/contact/message", mailController.sendEmail);
router.post(
  "/confirmation/message",
  ProtectedRoute,
  mailController.sendConfirmationMail
);
module.exports = router;
