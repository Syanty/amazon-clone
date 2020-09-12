const router = require("express").Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");

/* signup user*/

router.post("/auth/signup", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
        res.json({
          status: false,
          message: "Please provide email or password",
        });
      } else {
        let newUser = new user();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
    
        await newUser.save();
    
        let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800, //in a week
        });

        res.json({
            status:true,
            token: token,
            message:"successfully created new user"
        })
      }
  } catch (error) {
      res.status(500).json({
          status:false,
          message: error.message
      })
  }
});

module.exports = router