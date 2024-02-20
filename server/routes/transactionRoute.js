const { initializeTransaction, transactions } = require("../controllers/transactionControls");

const express = require("express");

const router = express.Router();

router.route("/initialize_table").get(initializeTransaction);

router.route('/transactions').get(transactions);


module.exports = router;
