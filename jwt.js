const jwt = require("jsonwebtoken");
const httpstatus = require("http-status");

const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(httpstatus.UNAUTHORIZED)
        .json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(httpstatus.UNAUTHORIZED)
        .json({ error: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // token data
    next();
  } catch (err) {
    return res.status(httpstatus.UNAUTHORIZED).json({ error: "Invalid token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "5h" });
};

module.exports = { jwtAuthMiddleware, generateToken };
