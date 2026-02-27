const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  usn: String,
  message: String,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Claim", claimSchema);