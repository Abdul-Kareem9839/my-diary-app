if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user");
const userRoutes = require("./routes/user");
const entryRoutes = require("./routes/entry");
const authRoutes = require("./routes/auth");
const rateLimit = require("express-rate-limit");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: "Too many accounts created, try again after an hour.",
});
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many login attempts, try again later.",
});
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: "Too many requests, please try again later.",
});

app.use((req, res, next) => {
  if (req.method !== "OPTIONS") {
    console.log("Request body:", req.body);
  }
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-diary-app-zenscribe.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

async function main() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("connection to DB");
  } catch (err) {
    console.error("Mongodb connectoin error: ", err);
    process.exit(1);
  }
}
main();

const PORT = process.env.PORT || 8080;

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SECRET,
  },
});

store.on("error", (e) => {
  console.log("Session store error", e);
});

const sessionOption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);

const callbackURLs = [
  "http://localhost:8080/api/auth/google/callback",
  "https://my-diary-app-zenscribe.onrender.com/api/auth/google/callback",
];
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? callbackURLs[1]
          : callbackURLs[0],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id }); //Checking googleId exists?
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value }); //Checking user email exists?
          if (user) {
            user.googleId = profile.id; //Linking Google account to existing user
            await user.save();
          } else {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.displayName,
            }); //Creating new user
          }
        }
        done(null, user); //Finishing authentication
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.curruser = req.user;
  next();
});

app.use("/api/register", registerLimiter);
app.use("/api/login", loginLimiter);
app.use("/api/auth/google", signinLimiter);
app.use("/api", apiLimiter);

app.use("/api", userRoutes);
app.use("/api", entryRoutes);
app.use("/api", authRoutes);

app.get(/.*/, (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  }
});

// app.all("*", (req, res, next) => {
//   console.log("404 for URL:", req.originalUrl);
//   next(new ExpressError(404, "Page not found"));
// });

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
