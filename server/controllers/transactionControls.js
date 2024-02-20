const Transaction = require("../models/transactionModel");
const axios = require("axios");

exports.initializeTransaction = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    const transactions = response.data;

    await Transaction.insertMany(transactions);

    res.status(200).json({
      success: true,
      message: "Transactions added",
      transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.transactions = async (req, res) => {
    try {
      const { page = 1, perPage = 10, search } = req.query;
      const query = {};
  
      if (search) {
        const searchRegex = new RegExp(search, "i");
        const isNumeric = !isNaN(search);
        query.$or = [
          { title: searchRegex },
          { description: searchRegex },
          ...(isNumeric ? [{ price: parseFloat(search) }] : [])
        ];
      }
  
     
      const totalCount = await Transaction.countDocuments(query);
  
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);
  
      res.status(200).json({
        success: true,
        total: totalCount,
        page,
        perPage,
        transactions,
      });
    } catch (err) {
      res.status(500).json({ 
          success: false,
          message: err.message 
      });
    }
  };
