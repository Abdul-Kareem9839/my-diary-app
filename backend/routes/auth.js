const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    console.log("Redirecting to:", clientUrl + "/dashboard");
    res.redirect(`${clientUrl}/dashboard`);
  }
);

module.exports = router;
