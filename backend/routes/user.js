const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { validateRegister, validateLogin } = require("../middleware");
const passport = require("passport");

//register route
router.post("/register", validateRegister, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password); // <-- handles password

    req.logIn(registeredUser, (err) => {
      if (err) return next(err);
      console.log("User logged in after registration:", registeredUser.email);
      return res.status(201).json({
        message: "User registered and logged in successfully",
        user: { id: registeredUser._id, email: registeredUser.email },
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//signin route
router.post("/signin", validateLogin, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ error: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log("User session created:", user.email);
      return res.json({
        message: "Login successful",
        user: { id: user._id, email: user.email },
      });
    });
  })(req, res, next);
});

router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Req.user", req.user);
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
