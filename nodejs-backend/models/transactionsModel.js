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
    select:true 
  },
  tokenExpires: Date,
});

transactionsSchema.pre("save", function (next) {
  var hex, generated;
  crypto.randomBytes(8, function (ex, buf) {
    hex = buf.toString("hex");
    generated = parseInt(hex, 16);
    this.token = generated;    
  });

  this.tokenExpires = Date.now() + (this.transactionAmount / 100) * 60 * 1000;

  next();
});
const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
