const express = require("express");
const router = express.Router();

const Elektronik = require("../models/listAllProductsElektronik.js");
const EvEsyalari = require("../models/listAllProductsEvEsyalari.js");
const Giyim = require("../models/listAllProductsGiyim.js");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const intId = parseInt(id);

    const urun =
      (await Elektronik.findOne({ id: intId })) ||
      (await EvEsyalari.findOne({ id: intId })) ||
      (await Giyim.findOne({ id: intId }));

    if (!urun) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.json(urun);
  } catch (error) {
    console.error("Ürün getirme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
