const User = require("../Models/User");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false, message: 'Unauthorized' })
  }
  
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(data.id);
    if (user) {
      // Attach the user to the request object for later use in the route handlers
      req.user = user.username;
      next(); // Call next() to proceed to the next middleware/route handler
    } else {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: 'Unauthorized' });
  }
};