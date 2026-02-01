const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/artists", artistRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});
console.log(artistRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});