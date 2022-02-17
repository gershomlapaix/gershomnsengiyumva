const factory = require("./../controllers/handleFactory");
const User = require("./../models/User");
const Transaction = require("./../models/transactionsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.getAllMadeTransactions = factory.getAll(Transaction);

exports.makeTransaction = catchAsync(async (req, res, next) => {
  const { transactionAmount } = req.body;

  if (!transactionAmount) {
    return next(new AppError("Please provide transactionAmount!", 400));
  }

  const user = await User.findOne({ meterNumber: req.user.meterNumber });

  const token = user.createToken()
  console.log(token);

  // const newTransaction = await Transaction.create({
  //   meterNumber: req.user.meterNumer,
  //   transactionAmount,
  //   token: user.createToken(),
  // });

  res.status(200).json({
    status: "succes",
    data: {
      newTransaction,
    },
  });
});
