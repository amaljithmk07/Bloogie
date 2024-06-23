const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded_token = jwt.verify(token,"Secret_key");
    req.userData = {
      userId: decoded_token.UserId,
      userEmail: decoded_token.UserEmail,
    };
    console.log("req.UserData :", req.userData);
    next();
  } catch (err) {
    res.status(401).json({
      Error: true,
      success: false,
      message: "Auth Failed",
      errorMessage: err.message,
    });
  }
};
