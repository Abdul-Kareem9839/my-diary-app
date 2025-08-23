const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/user/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/user/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    console.log("Google user logged in:", req.user.email || req.user.name);
    res.redirect("http://localhost:5173/dashboard");
  }
);

module.exports = router;
