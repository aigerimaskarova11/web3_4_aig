const Song = require("../models/Song");

exports.getAll = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist", "name genre debutYear");
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist", "name genre debutYear");

    if (!song)
      return res.status(404).json({ message: "Song not found" });

    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    const populatedSong = await song.populate("artist");
    res.status(201).json(populatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("artist");

    res.json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
