"use strict";
const express = require("express");
const router = express.Router();

const { Country, Activity, Season } = require("../db.js");
//const Seasons = require("../models/Seasons.js");

router.use(express.json());


router.get("/", async (req, res) => {
    try {
      const seasons = await Season.findAll({ attributes: ["name", "id"] });
      if (seasons.length !== 0) {
        res.json(seasons);
      } else {
        res.json([{ name: "No hay temporadas guardadas" }]);
      }
    } catch (e) {
      console.log("/routes/seasons.js get / error: ", e);
    }
  });

  module.exports = router;