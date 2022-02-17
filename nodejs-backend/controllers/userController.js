const factory = require("./../controllers/handleFactory");
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/User");
const AppError = require("./../utils/AppError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, meterNumber } = req.body;

  // 1
  if (!username || !meterNumber) {
    return next(new AppError("Please provide username and meterNumber!", 400));
  }

  // 2
  const user = await User.findOne({ username }).select("+meterNumber");

  if (!user) {
    return next(new AppError("Incorrect username or meterNumber", 401));
  }

  // 3
  createSendToken(user, 200, res);
});


exports.protect = catchAsync(async (req, res, next) => {
  
    // 1.
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
  
      if (!token) {
        return next(new AppError('You not allowed', 401));
      }
    }
   
    // 2.
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);
  
    // 3.
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        new AppError('The Token belonging to this user does no longer exist', 401)
      );
    }
        
    req.user = freshUser;
    next();
  });
  
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User)
