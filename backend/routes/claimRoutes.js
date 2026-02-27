const router = require("express").Router();
const Claim = require("../models/Claim");
const Item = require("../models/Item");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// 🔹 User creates claim
router.post("/", protect, async (req, res) => {
  try {
    const { itemId, name, usn, message } = req.body;

    if (!name || !usn || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const claim = await Claim.create({
      itemId,
      userId: req.user._id,   // ✅ fixed
      name,
      usn,
      message,
      status: "pending"
    });

    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: "Claim failed" });
  }
});

// 🔹 Admin gets all claims
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("itemId")
      .populate("userId", "username");   // ✅ fixed

    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

// 🔹 Approve Claim (Admin)
router.put("/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    claim.status = "approved";
    await claim.save();

    await Item.findByIdAndUpdate(claim.itemId, {
      status: "claimed"
    });

    res.json({ message: "Claim Approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

// 🔹 Reject Claim (Admin)
router.put("/reject/:id", protect, adminOnly, async (req, res) => {
  try {
    await Claim.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "Claim Rejected" });
  } catch (err) {
    res.status(500).json({ message: "Reject failed" });
  }
});

module.exports = router;