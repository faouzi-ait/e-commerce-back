const User = require("../models/User");
User.com
const admin = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user._id,
  });

  if (user.role === 0) {
    return res.status(403).json({
      success: false,
      message: "Administrators Only",
    });
  }
  next();
};

module.exports = admin;
