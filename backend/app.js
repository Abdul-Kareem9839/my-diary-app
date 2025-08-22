require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const entryRoutes = require("./routes/entry");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");

const User = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.method !== "OPTIONS") {
    console.log("Request body:", req.body);
  }
  next();
});

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const dbUrl =
  "mongodb+srv://abdul-kareem:deps9owxngrrXqBp@cluster0.dr0tvme.mongodb.net/ZenScribe?retryWrites=true&w=majority&appName=Cluster0&tls=true";

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("connection to DB");
  } catch (err) {
    console.error("Mongodb connectoin error: ", err);
    process.exit(1);
  }
}
main();

const PORT = process.env.PORT || 8080;

const store = MongoStore.create({
  mongoUrl: dbUrl,
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
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);

const callbackURLs = [
  "http://localhost:8080/api/user/google/callback",
  "https://your-backend-app.onrender.com/api/user/google/callback",
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
        // 1. Check if a user with this googleId exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // 2. Check if a user with this email exists (registered via Local)
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // 3. Link Google account to existing user
            user.googleId = profile.id;
            await user.save();
          } else {
            // 4. Create new user
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.displayName,
            });
          }
        }

        // Finish authentication
        done(null, user);
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

app.use("/api", userRoutes);
app.use("/api", entryRoutes);
app.use("/api", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// app.all("*", (req, res, next) => {
//   console.log("404 for URL:", req.originalUrl);
//   next(new ExpressError(404, "Page not found"));
// });

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
