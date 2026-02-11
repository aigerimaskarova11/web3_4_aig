const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  debutYear: { type: Number, required: true },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x300?text=Artist"
  }
});

module.exports = mongoose.model("Artist", artistSchema);
