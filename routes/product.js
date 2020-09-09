const router = require("express").Router();
const Product = require("../models/product");

//POST ---- create product

router.post("/products", async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title,
    product.description = req.body.description,
    product.photo = req.body.photo,
    product.stockQuantity = req.body.stockQuantity,
    await product.save();

    res.json({
      status: true,
      message: "Successfully added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
