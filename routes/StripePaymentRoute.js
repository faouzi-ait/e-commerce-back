const router = require("express").Router();
const stripePaymentController = require("../controller/StripePaymentController");
const passport = require("passport");

const ProtectedRoute = passport.authenticate("jwt", { session: false });

router.post(
  "/checkout/payment",
  ProtectedRoute,
  stripePaymentController.sendStripePayment
);

module.exports = router;
