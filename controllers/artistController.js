const Artist = require("../models/Artist");

exports.getAll = async (req, res) => {
  const artists = await Artist.find();
  res.json(artists);
};

exports.getOne = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist)
    return res.status(404).json({ message: "Artist not found" });
  res.json(artist);
};

exports.create = async (req, res) => {
  const artist = await Artist.create(req.body);
  res.status(201).json(artist);
};

exports.update = async (req, res) => {
  const artist = await Artist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(artist);
};

exports.delete = async (req, res) => {
  await Artist.findByIdAndDelete(req.params.id);
  res.json({ message: "Artist deleted" });
};
