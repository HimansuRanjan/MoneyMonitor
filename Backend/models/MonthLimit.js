const mongoose = require("mongoose");

const monthlyLimitSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Please enter an amount"]
    },

    month:{
        type: Number
    },

    year: {
        type: Number
    },

    saveOnMonth: {
        type: Number
    },

    expenditure:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expenditure"
      },
    ]
});

module.exports = mongoose.model("MonthLimit", monthlyLimitSchema);