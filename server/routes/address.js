const router = require("express").Router();
const Address = require("../models/address");
const verifyToken = require("../middlewares/verify-token")
const axios = require("axios")
//POST

router.post("/addresses",verifyToken, async (req, res) => {
  try {
    const address = new Address();
    
    address.user = req.decoded._id
    address.country = req.body.country
    address.city = req.body.city
    address.state = req.body.state
    address.zipCode = req.body.zipCode
    address.streetAddress = req.body.streetAddress
    address.fullName = req.body.fullName
    address.phoneNumber = req.body.phoneNumber
    address.deliverInstructions = req.body.deliverInstructions
    address.securityCode = req.body.securityCode

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
router.get("/addresses", verifyToken, async(req,res)=>{
    try {
        let addresses = await Address.find({user: req.decoded._id})

        res.json({
              success:true,
              addresses:addresses  
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
})


//GET COUNTRIES USING THIRD PARTY API

router.get("/countries", async(req,res)=>{
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all")
    res.json(response.data)
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})

module.exports = router
