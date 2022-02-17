const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
  meterNumber: {
    type: Number,
    ref: "User",
    required: [true, "The meter number is required"],
  },
  transactionAmount: {
    type: Number,
  },
});

// transactionsSchema.virtual('token').get()

const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
