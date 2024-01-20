const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please enter your name"],
      },

    goalAmount: {
        type: Number
    },

    savedAmount: {
        type: String,
    },

});

module.exports = mongoose.model("Goal", goalSchema);