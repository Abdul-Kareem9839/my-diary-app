const { entrySchema, registerSchema, loginSchema } = require("./schema");

// API-only login check
module.exports.isLoggedIn = (req, res, next) => {
  console.log("User in session:", req.user);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    return res.status(401).json({ error: "You must be logged in" });
  }
  req.user_id = req.user._id;
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Validate entry
module.exports.validateEntry = (req, res, next) => {
  const { error } = entrySchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return res.status(400).json({ error: msg }); // return stops execution
  }
  next();
};

// Validate registration
module.exports.validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return res.status(400).json({ error: msg });
  }
  next();
};

// Validate login
module.exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return res.status(400).json({ error: msg });
  }
  next();
};
