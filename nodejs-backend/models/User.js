const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
    },
    id: {
      type: Number,
      maxlength: [16, "The maximum number must be 16"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
