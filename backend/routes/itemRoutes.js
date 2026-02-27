const router = require("express").Router();
const Item = require("../models/Item");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 🔹 Create Item (User)
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      image: req.file ? req.file.filename : null,
      postedBy: req.user._id,
      status: "pending",
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Item creation failed" });
  }
});

// 🔹 Get Approved Items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ status: "approved" })
      .populate("postedBy", "username");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

// 🔹 Get Pending Items (Admin Only)
router.get("/pending", protect, adminOnly, async (req, res) => {
  try {
    const items = await Item.find({ status: "pending" });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

// 🔹 Approve Item (Admin Only)
router.put("/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Item Approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

// 🔹 Delete Item (Admin Only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// 🔹 Admin Statistics
router.get("/stats/overview", protect, adminOnly, async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    const pendingItems = await Item.countDocuments({ status: "pending" });
    const approvedItems = await Item.countDocuments({ status: "approved" });

    const Claim = require("../models/Claim");
    const User = require("../models/User");

    const totalClaims = await Claim.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });

    res.json({
      totalItems,
      pendingItems,
      approvedItems,
      totalClaims,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "Stats fetch failed" });
  }
});

module.exports = router;