require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

connectDB();

app.use("/api/artists", artistRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);

console.log(artistRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});