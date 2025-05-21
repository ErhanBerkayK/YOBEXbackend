require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); 

const app = express();
app.use(express.json());

connectDB();

///// ROUTES:

/// TUM URUNLERI LISTELEME:
// http://localhost:8000/api/listAllProducts
const productRoutes = require("./routes/listAllProducts.js");
app.use("/api/listAllProducts", productRoutes);

/// id ye GORE BELLIRLI BIR URUNU GORUNTULEME:
// http://localhost:8000/api/getProductById/1
const getProductById = require("./routes/getProductById.js");
app.use("/api/getProductById", getProductById);

/// KATEGORI LISTELEME:
// http://localhost:8000/api/listCategories
const categoryRoutes = require("./routes/listCategories.js");
app.use("/api/listCategories", categoryRoutes);

/// KATEGORIYE GORE URUN FILTRELEME:
// http://localhost:8000/api/filterProductsByCategory?category=Elektronik
const filterByCategoryRoutes = require("./routes/filterProductsByCategory.js");
app.use("/api/filterProductsByCategory", filterByCategoryRoutes);

/// FIYAT ARALIGINA GORE URUN FILTRELEME:
// http://localhost:8000/api/productFilteringByPriceRange?minPrice=100&maxPrice=500
const filterByPriceRoutes = require("./routes/productFilteringByPriceRange.js");
app.use("/api/productFilteringByPriceRange", filterByPriceRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
