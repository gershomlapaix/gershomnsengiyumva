const mongoose = require("mongoose");
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    meterNumber: {      
      type: Number,
      maxlength: 6,
      unique: true,
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

userSchema.pre("save", function (next) {
  this.meterNumber = parseInt(crypto.randomBytes(2).toString("hex"), 16);
  // console.log(parseInt(crypto.randomBytes(2).toString("hexy"), 16));

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
