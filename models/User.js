const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.Schema(
  {
    firstname: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true,
    },
    lastname: {
      type: String,
      min: 2,
      maxlength: 100,
      required: true,
    },
    email: {
      type: String,
      min: 4,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    history: {
      type: Array,
      default: [],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

User.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", User);
