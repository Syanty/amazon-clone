const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");

//POST ---- create product

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    (product.owner = req.body.ownerID),
    (product.category = req.body.categoryID),
    (product.title = req.body.title),
    (product.price = req.body.price),
    (product.description = req.body.description),
    (product.photo = req.file.location),
    (product.stockQuantity = req.body.stockQuantity),
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

//GET all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();

    res.json({
      status: true,
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
    let product = await Product.findOne({ _id: req.params.id });

    res.json({
      status: true,
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
          category: req.body.categoryID,
          owner: req.body.ownerID,
        },
      },
      {
        upsert: true,
      }
    );

    res.json({
      status: true,
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
        status: true,
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
