const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/user.model");
const { generateToken, jwtAuthMiddleware } = require("../jwt");

// -------------------- REGISTER --------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Already Exists?
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash Password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
    });

    await user.save();

    res.json({ message: "User Registered Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check User
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// -------------------- PROTECTED ROUTE --------------------
router.get("/profile", jwtAuthMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed!",
    userData: req.user,
  });
});

module.exports = router;
