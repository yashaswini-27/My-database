const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: "user"   // TEMPORARY
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });

  } catch (err) {
  console.log("REGISTER ERROR:", err);  // 👈 VERY IMPORTANT
  res.status(500).json({ message: err.message });
}
});
/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email, password);   // 👈 ADD THIS

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);  // 👈 ADD THIS

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);   // 👈 ADD THIS

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;