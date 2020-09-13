const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");

//POST ---- create product

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    (product.owner = req.body.owner),
    (product.category = req.body.category),
    (product.title = req.body.title),
    (product.price = req.body.price),
    (product.description = req.body.description),
    (product.photo = req.file.location),
    (product.stockQuantity = req.body.stockQuantity),
    await product.save();

    res.json({
      success: true,
      message: "Successfully added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//GET all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().populate("owner category").populate("reviews","rating").exec();

    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//GET single product
// api/products/1

router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id }).populate("owner category").populate("reviews","rating").exec();

    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// updating single product

router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          stockQuantity: req.body.stockQuantity,
          photo: req.file.location,
          category: req.body.category,
          owner: req.body.owner,
        },
      },
      {
        upsert: true,
      }
    );

    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete single product
router.delete("/products/:id", async (req, res) => {
  try {
    let deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deleteProduct) {
      res.json({
        success: true,
        message: "successfully deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
