const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");
const verifyToken = require("../middlewares/verify-token");
const Review = require("../models/review");

router.post(
  "/reviews/:productID",
  [verifyToken, upload.single("photo")],
  async (req, res) => {
    try {
      let review = new Review();

      review.headline = req.body.headline;
      review.body = req.body.body;
      review.rating = req.body.rating;
      review.photo = req.file.location;
      review.user = req.decoded._id;
      review.productID = req.params.productID;

      await Product.update({ $push: { reviews:review._id }});

      const savedReview = await review.save();

      if (savedReview) {
        res.json({
          success: true,
          message: "Successfully added Review",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.get("/reviews/:productID", async (req, res) => {
  try {
    let productReviews = await Review.find({
      productID: req.params.productID,
    })
      .populate("user")
      .exec();

    res.json({
      success: true,
      reviews: productReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
