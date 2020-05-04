const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const config = require("../configuration/config");

// LOCAL LOGIN STATEGY
const localLogin = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);

      user.comparePassword(password, function (err, isMatch) {
        console.log(password);
        if (err) return done(err);
        if (!isMatch) return done(null, false);

        return done(null, user);
      });
    });
  }
);

// TODO: SOCIAL LOGIN STRATEGY...

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.params.TOKEN_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, done);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
