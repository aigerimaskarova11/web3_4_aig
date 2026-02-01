const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  debutYear: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Artist", artistSchema);
