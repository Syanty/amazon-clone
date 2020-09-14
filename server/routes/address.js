const router = require("express").Router();
const Address = require("../models/address");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");
const User = require("../models/user");
//POST

router.post("/addresses", verifyToken, async (req, res) => {
  try {
    const address = new Address();

    address.user = req.decoded._id;
    address.country = req.body.country;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.streetAddress = req.body.streetAddress;
    address.fullName = req.body.fullName;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();

    res.json({
      success: true,
      message: "address successfully added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//GET
router.get("/addresses", verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses: addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/addresses/:id", async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id });

    res.json({
      success: true,
      address: address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//update address
router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    const foundAddress = await Address.findOne({user: req.decoded._id, _id: req.params.id });

    if (foundAddress) {
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliverInstructions)
        foundAddress.deliverInstructions = req.body.deliverInstructions;
      if (req.body.securityCode)
        foundAddress.securityCode = req.body.securityCode;
    }

    await foundAddress.save();

    res.json({
      success: true,
      message: "address successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//DELETE
router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let deletedAddress = await Address.remove({
      user: req.decoded._id,
      _id: req.params.id,
    });
    if (deletedAddress) {
      res.json({
        success: true,
        message: "address successfully deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//SET DEFAULT ADDRESS
router.put("/addresses/set/default/", verifyToken, async (req, res) => {
  try {
    let defaultAddress = await User.findOneAndUpdate(
      {
        _id: req.decoded._id,
      },
      {
        $set: {
          address: req.body.id,
        },
      }
    );

    if(defaultAddress){
      res.json({
        success:true,
        message:"successfully set as default"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    });
  }
});

//GET COUNTRIES USING THIRD PARTY API

router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
