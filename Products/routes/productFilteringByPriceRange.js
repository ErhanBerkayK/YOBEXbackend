const express = require("express");
const router = express.Router();

const Elektronik = require("../models/listAllProductsElektronik.js");
const EvEsyalari = require("../models/listAllProductsEvEsyalari.js");
const Giyim = require("../models/listAllProductsGiyim.js");

router.get("/", async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ message: "Geçerli bir fiyat aralığı girin." });
    }

    const elektronik = await Elektronik.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    const evEsyalari = await EvEsyalari.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    const giyim = await Giyim.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    const urunler = [...elektronik, ...evEsyalari, ...giyim];

    res.json(urunler);
  } catch (error) {
    console.error("Fiyata göre ürün filtreleme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
