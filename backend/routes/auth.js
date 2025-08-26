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
      // If something went wrong, force user back to signin
      return res.redirect(
        ("https://my-diary-app-zenscribe.onrender.com" ||
          "http://localhost:5173") + "/signin"
      );
    }

    const clientUrl =
      "https://my-diary-app-zenscribe.onrender.com" || "http://localhost:5173";
    console.log(
      "✅ Google login successful, redirecting to:",
      clientUrl + "/dashboard"
    );
    res.redirect(`${clientUrl}/dashboard`);
  }
);

module.exports = router;
