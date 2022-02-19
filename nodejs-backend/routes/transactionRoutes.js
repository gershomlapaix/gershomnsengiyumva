const transactionController = require("./../controllers/transactionsController");
const userController = require("./../controllers/userController");
const express = require("express");
const Transaction = require("../models/transactionsModel");
const router = express.Router();

router
  .route("/")
  .get(transactionController.getAllMadeTransactions)
  .post( transactionController.makeTransaction);

router.route("/:id").delete(transactionController.deleteTransaction);

module.exports = router;
