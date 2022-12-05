const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isMailExistInDb = await User.findOne({ email: email });

    if (isMailExistInDb !== null) {
      return res.status(400).json({ message: "mail déja existant !" });
    }

    if (!username) {
      return res
        .status(402)
        .json({ message: "le username n'est pas renseigné" });
    }

    if (!email) {
      return res.status(403).json({ message: "le mail n'est pas renseigné" });
    }

    const salt = uid2(16);

    const hash = SHA256(salt + password).toString(encBase64);

    const token = uid2(64);

    const newUser = new User({
      email: email,

      username: username,

      token: token,
      hash: hash,
      salt: salt,
    });
    await newUser.save();

    console.log(newUser);
    res.json({
      _id: newUser._id,
      token: newUser.token,

      username: newUser.account.username,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
