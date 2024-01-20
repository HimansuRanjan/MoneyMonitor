const mongoose = require("mongoose");

const expensSchema = new mongoose.Schema({
    monthlyLimit:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "MonthLimit",
        },
    
    saved: {
        type: Number
    },

    dailyExpense: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DailyExpnditure",
        },
      ]
});

module.exports = mongoose.model("Expenditure", expensSchema);