const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false, required: true },
    resetToken: { type: String },
    resetExpireToken: { type: Date },
    activateToken: { type: String },
    activateExpireToken: { type: Date },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
