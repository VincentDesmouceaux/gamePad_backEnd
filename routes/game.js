const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/games", async (req, res) => {
  try {
    let { search, ordering } = req.query;

    if (!search) {
      search = "";
    }

    if (!ordering) {
      ordering = "";
    }

    const response = await axios.get(
      `https://api.rawg.io/api/games?search=${search}&ordering=${ordering}&key=${process.env.API_KEY}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/gamedetails/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
