require("../services/AuthenticationService");
const router = require("express").Router();
const passport = require("passport");

const UserController = require("../controller/UserController");

const UserAuthentication = passport.authenticate("local", { session: false });
const PrivateRoutes = passport.authenticate("jwt", { session: false });
const AdminOnlyRoutes = require("../services/AccessControlService");

router.post("/auth", UserController.createUser);
router.post("/login", UserAuthentication, UserController.signInUser);

module.exports = router;
