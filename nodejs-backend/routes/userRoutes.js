const userController = require("./../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").get(userController.protect, userController.getAllUsers);
router.route("/").post(userController.createUser)

router.route("/login").post(userController.login);

module.exports = router;
