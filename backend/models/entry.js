const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  card_id: {
    type: String,
    required: true,
  },
  emoji: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true, trim: true },

  image: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },

  content: { type: String, required: true },
  date: { type: String },
  time: { type: String },

  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;
