const express = require("express");
const router = express.Router();
const Entry = require("../models/entry");
const User = require("../models/user");
const { validateEntry, isLoggedIn } = require("../middleware");
const { format } = require("date-fns");
const { storage, cloudinary } = require("../cloudConfig");
const multer = require("multer");
const upload = multer({ storage });

//new entry creation
router.post(
  "/dashboard",
  isLoggedIn,
  upload.single("image"),
  validateEntry,

  async (req, res) => {
    try {
      if (!req.user)
        return res.status(401).json({ message: "Please login first" });

      console.log("Logged-in user:", req.user);
      const formattedDate = format(new Date(), "MMM dd, yyyy");
      const formattedTime = format(new Date(), "hh:mm a");

      console.log(req.file);

      const newEntry = new Entry({
        user: req.user._id,
        card_id: req.body.card_id,
        emoji: req.body.emoji,
        label: req.body.label,
        description: req.body.description,
        image: req.file
          ? {
              url: req.file.path || req.file.url,
              filename: req.file.filename,
            }
          : null,
        content: req.body.content,
        date: formattedDate,
        time: formattedTime,
      });

      await newEntry.save();
      console.log(newEntry);
      res
        .status(201)
        .json({ message: "Entry saved successfully", entry: newEntry });
    } catch (error) {
      console.error("Failed to save entry:", error);
      res.status(500).json({ error: "Failed to save entry" });
    }
  }
);

//dashboard route
// router.get("/dashboard", isLoggedIn, async (req, res) => {
//   try {
//     if (!req.user)
//       return res.status(401).json({ message: "Please login first" });

//     const entries = await Entry.find({ user: req.user._id });
//     res.json({ entries });
//   } catch (error) {
//     console.error("Dashboard error:", error);
//     res.status(500).json({ error: "Failed to fetch entries" });
//   }
// });

router.get("/dashboard", isLoggedIn, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id });
    const user = await User.findById(req.user._id);

    const entriesWithBookmark = entries.map((entry) => ({
      ...entry.toObject(),
      isBookmarked: user.bookmarks.includes(entry._id.toString()),
    }));

    res.json({ entries: entriesWithBookmark });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

//show entry route
router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  const entry = await Entry.findById(id);
  if (!entry) return res.status(404).json({ error: "Entry not found" });
  res.json(entry);
});

//delete entry route
router.delete("/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Entry.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Entry not found" });
    if (deleted.image && deleted.image.filename) {
      await cloudinary.uploader.destroy(deleted.image.filename);
    }
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

//update entry route
router.put("/view/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//bookmark route
router.put("/users/:userId/bookmark", async (req, res) => {
  try {
    const { entryId, bookmark } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (bookmark) {
      if (!user.bookmarks.includes(entryId)) {
        user.bookmarks.push(entryId);
      }
    } else {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== entryId);
    }
    await user.save();
    await user.populate("bookmarks");
    res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users/:userId/bookmarks", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("bookmarks");
    if (!user) return res.status(404).json({ error: "User not found" });
    const bookmarksWithFlag = user.bookmarks.map((entry) => ({
      ...entry.toObject(),
      isBookmarked: true,
    }));

    console.log("Bookmarks with flag:", bookmarksWithFlag);
    res.json({ bookmarks: bookmarksWithFlag });
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

module.exports = router;
