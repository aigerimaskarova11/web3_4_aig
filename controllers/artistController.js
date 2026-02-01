const Artist = require("../models/Artist");

const getAll = async (req, res) => {
  const artists = await Artist.find();
  res.json(artists);
};

const getOne = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    return res.status(404).json({ error: "Artist not found" });
  }
  res.json(artist);
};

const create = async (req, res) => {
  const artist = await Artist.create(req.body);
  res.status(201).json(artist);
};

const update = async (req, res) => {
  const artist = await Artist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(artist);
};

const remove = async (req, res) => {
  await Artist.findByIdAndDelete(req.params.id);
  res.json({ message: "Artist deleted" });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  delete: remove
};
