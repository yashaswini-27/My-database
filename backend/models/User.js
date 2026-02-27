const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

/* =========================
   HASH PASSWORD BEFORE SAVE
========================= */
userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);

});

module.exports = mongoose.model("User", userSchema);