const express = require("express");
const router = express.Router();

const Elektronik = require("../models/listAllProductsElektronik.js");
const EvEsyalari = require("../models/listAllProductsEvEsyalari.js");
const Giyim = require("../models/listAllProductsGiyim.js");

router.get("/", async (req, res) => {
  try {
    const elektronikUrunler = await Elektronik.find({});
    const evEsyalariUrunler = await EvEsyalari.find({});
    const giyimUrunler = await Giyim.find({});

    const tumUrunler = [
      ...elektronikUrunler,
      ...evEsyalariUrunler,
      ...giyimUrunler,
    ];

    res.json(tumUrunler);
  } catch (error) {
    console.error("Ürünler listelenirken hata:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
