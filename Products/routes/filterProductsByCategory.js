const express = require("express");
const router = express.Router();

const Elektronik = require("../models/listAllProductsElektronik.js");
const EvEsyalari = require("../models/listAllProductsEvEsyalari.js");
const Giyim = require("../models/listAllProductsGiyim.js");

router.get("/", async (req, res) => {
  try {
    const kategori = req.query.category;

    const elektronik = await Elektronik.find(kategori ? { category: kategori } : {});
    const evEsyalari = await EvEsyalari.find(kategori ? { category: kategori } : {});
    const giyim = await Giyim.find(kategori ? { category: kategori } : {});

    const urunler = [...elektronik, ...evEsyalari, ...giyim];

    res.json(urunler);
  } catch (error) {
    console.error("Kategoriye göre ürün filtreleme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
