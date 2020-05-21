const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

exports.createUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !password) {
    return res.status(422).json({
      success: false,
      message: "Please fill in all the required fields",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please type in a valid email: email@somewhere.com",
    });
  }

  const emailExist = await User.findOne({
    email,
  });

  if (emailExist) {
    return res.status(400).json({
      success: false,
      message: "The user already exist",
    });
  }

  const user = new User({
    firstname,
    lastname,
    avatar: "",
    email,
    password,
  });

  try {
    const newUser = await user.save();

    res.status(201).json({
      success: true,
      message: "Your account was successfully created",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "The user creation was not sucessfull",
    });
  }
};

exports.signInUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  return res.status(200).json({
    success: true,
    user: {
      email,
      token: generateToken(user),
    },
  });
};

exports.updateUserPurchaseHistory = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "The specified user id was not found",
      });
    }

    user.history = [...user.history, req.body.shoppingCart];

    user.save((err) => {
      if (err) {
        console.error("Error while saving the history");
      }
    });

    res.status(200).json({
      success: true,
      history: user.history,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "The specified user id was not found",
      });
    }

    user.avatar = req.body.avatarLink;

    user.save((err) => {
      if (err) {
        console.error("Error while saving the history");
      }
    });

    res.status(200).json({
      success: true,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

const isValidEmail = (e) => {
  const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
};

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role,
    },
    config.params.TOKEN_SECRET
  );
  return token;
};
