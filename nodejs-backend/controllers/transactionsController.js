const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/User");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
  
    // cookies enabling
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httponly: true, // can not be modified by the browser in any way
    };
  
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
  
    // remove the password from the output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  };

exports.makeTransaction = catchAsync(async (req, res, next) => {
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
