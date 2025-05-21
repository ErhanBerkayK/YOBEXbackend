const express = require("express");
const router = express.Router();

const Elektronik = require("../models/listAllProductsElektronik.js");
const EvEsyalari = require("../models/listAllProductsEvEsyalari.js");
const Giyim = require("../models/listAllProductsGiyim.js");

router.get("/", async (req, res) => {
  try {
    const elektronikKategoriler = await Elektronik.distinct("category");
    const evEsyalariKategoriler = await EvEsyalari.distinct("category");
    const giyimKategoriler = await Giyim.distinct("category");

    const tumKategoriler = [
      ...elektronikKategoriler,
      ...evEsyalariKategoriler,
      ...giyimKategoriler,
    ];

    const benzersizKategoriler = [...new Set(tumKategoriler)];

    res.json(benzersizKategoriler);
  } catch (error) {
    console.error("Kategoriler getirilirken hata:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
