const Song = require("../models/Song");

exports.getAll = async (req, res) => {
  const songs = await Song.find().populate("artist");
  res.json(songs);
};

exports.getOne = async (req, res) => {
  const song = await Song.findById(req.params.id).populate("artist");
  if (!song)
    return res.status(404).json({ message: "Song not found" });
  res.json(song);
};

exports.create = async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
};

exports.update = async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(song);
};

exports.delete = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Song deleted" });
};
