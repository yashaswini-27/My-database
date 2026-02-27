const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  location: String,
  date: String,
  image: String,   // 👈 add this
  status: { type: String, default: "pending" },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Item", itemSchema);