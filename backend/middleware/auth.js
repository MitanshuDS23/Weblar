const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = process.env;

exports.protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = header.split(" ")[1];
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
