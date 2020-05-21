require("../services/AuthenticationService");
const router = require("express").Router();
const passport = require("passport");

const UserController = require("../controller/UserController");

const ProtectedRoute = passport.authenticate("jwt", { session: false });
const AdminOnlyRoutes = require("../services/AccessControlService");

router.post("/auth", UserController.createUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  UserController.signInUser
);
router.post("/order/userHistory/:id", ProtectedRoute, UserController.updateUserPurchaseHistory);
router.post("/user/updateAvatar/:id", ProtectedRoute, UserController.updateUserAvatar);

module.exports = router;
