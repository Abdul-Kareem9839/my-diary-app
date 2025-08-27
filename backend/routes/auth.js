const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signin",
    session: true,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(
        (process.env.NODE_ENV === "production"
          ? "https://my-diary-app-zenscribe.onrender.com"
          : "http://localhost:5173") + "/signin"
      );
    }

    const clientUrl =
      process.env.NODE_ENV === "production"
        ? "https://my-diary-app-zenscribe.onrender.com"
        : "http://localhost:5173";
    res.redirect(`${clientUrl}/dashboard`);
  }
);

module.exports = router;
