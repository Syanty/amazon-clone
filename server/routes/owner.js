const router = require("express").Router();
const Owner = require("../models/owner");
const Upload = require("../middlewares/upload-photo")

//POST

router.post("/owners",Upload.single("photo"), async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();

    res.json({
      status: true,
      message: "owner successfully added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//GET
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      status: true,
      owners: owners,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
