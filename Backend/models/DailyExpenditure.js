const mongoose = require("mongoose");

const dailyExpenseSchema = new mongoose.Schema({
    type: {
        type: String
      },
    
    amount: {
        type: Number,
        required: [true, "Please enter an amount"],
      },

    datetime: {
        type: Date,
        default: Date.now,
      }
      
});

module.exports = mongoose.model("DailyExpnditure", dailyExpenseSchema);