const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true
  },
  youtubeUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Song", songSchema);
