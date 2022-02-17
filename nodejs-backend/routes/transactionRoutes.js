const transactionController = require("./../controllers/transactionsController");
const userController = require("./../controllers/userController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(transactionController.getAllMadeTransactions)
  .post(userController.protect, transactionController.makeTransaction);

module.exports = router;
