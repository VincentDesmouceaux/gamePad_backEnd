require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);
const gameRoutes = require("./routes/game");
const userRoutes = require("./routes/users");
const mygamesRoutes = require("./routes/mygames");
app.use(mygamesRoutes);
app.use(userRoutes);
app.use(gameRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
