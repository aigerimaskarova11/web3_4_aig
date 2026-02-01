const Song = require("../models/Song");

const getAll = async (req, res) => {
  const songs = await Song.find().populate("artist");
  res.json(songs);
};

const getOne = async (req, res) => {
  const song = await Song.findById(req.params.id).populate("artist");
  if (!song) {
    return res.status(404).json({ error: "Song not found" });
  }
  res.json(song);
};

const create = async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
};

const update = async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(song);
};

const remove = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Song deleted" });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  delete: remove
};
