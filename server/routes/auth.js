const router = require("express").Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

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
        status: true,
        token: token,
        message: "successfully created new user",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

/* profile api */

router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await user.findOne({ _id: req.decoded._id });

    if (foundUser) {
      res.json({
        success: true,
        message: "User found",
        user: foundUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* login api */

router.post("/auth/login", async (req, res) => {
  try {
    let foundUser = await user.findOne({ email: req.body.email });

    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: "Authentication failed, User not found",
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
        });
      } else {
        res.json({
          success: false,
          message: "Authorization failed, Wrong password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
