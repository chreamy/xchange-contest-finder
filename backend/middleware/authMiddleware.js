const jwt = require("jsonwebtoken");
const User = require('../schemas/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from decoded token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Authentication failed: User not found" });
    }

    req.user = user;
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;

