const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Send frontend URL dynamically
    res.json({
      message: "Google login successful",
      redirectUrl: process.env.CLIENT_URL + "/dashboard",
    });
  }
);

module.exports = router;
