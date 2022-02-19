const mongoose = require("mongoose");
const crypto = require("crypto");

const transactionsSchema = new mongoose.Schema({
  meterNumber: {
    type: Number,
    ref: "User",
    required: [true, "The meter number is required"],
  },
  transactionAmount: {
    type: Number,
  },
  token: {
    type: Number,
    select: true,
  },
  tokenExpires: Date,
});

transactionsSchema.pre("save", function (next) {
  this.token = parseInt(crypto.randomBytes(3).toString("hex"), 16);
  this.tokenExpires =
    this.transactionAmount < 100
      ? Date.now
      : Date.now() + (this.transactionAmount / 100) * 60 * 60 * 24 * 1000;

  next();
});
const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
