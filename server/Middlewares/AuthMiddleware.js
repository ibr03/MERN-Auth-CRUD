const User = require("../Models/User");
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false })
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.token = token;
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};