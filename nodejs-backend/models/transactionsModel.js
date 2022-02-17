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
    type: String,
    maxlength: 6,
  },
  tokenExpires: Date,
});

transactionsSchema.methods.createToken = function () {
  let generated = crypto.randomBytes(8).toString("hex");

  let transactionToken = parseInt(generated, 10);

  this.token = transactionToken;
  console.log(transactionToken);

  this.tokenExpires = Date.now() + (this.transactionAmount / 100) * 60 * 1000;

  return transactionToken;
};

const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
