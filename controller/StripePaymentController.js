const stripe = require("stripe")(process.env.stripe_secret);

exports.sendStripePayment = async (req, res, next) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).json({ error: stripeErr });
    } else {
      res.status(200).json({ success: true, result: stripeRes });
    }
  });
};
