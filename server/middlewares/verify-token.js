const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  /* optional */
  /* its for checking the input with Bearer .... */
  let checkBearer = "Bearer ";
  if (token.startsWith(checkBearer)) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: "Failed to authorize",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }else{
      res.json({
          success:false,
          message:"No token provided"
      })
  }
};
