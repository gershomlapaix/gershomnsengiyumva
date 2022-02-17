const userController = require("./../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

module.exports = router;
