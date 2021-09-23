const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY);
    console.log("ok");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
    });
  }
};

module.exports = checkAuth;
