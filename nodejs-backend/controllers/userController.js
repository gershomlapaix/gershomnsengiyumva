const factory = require("./../controllers/handleFactory");
const User = require("./../models/User");

exports.getAllUsers = factory.getAll(User);
