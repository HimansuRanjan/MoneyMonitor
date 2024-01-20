const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: [true, "Email already exists"],
      },
    
    password: {
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
      },

    name: {
        type: String
      },

    age: {
        type: Number
    },

    occupation: {
        type: String,
    },

    goals: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Goal",
        },
      ],
    expenditure:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expenditure",
      }
    ]

});

module.exports = mongoose.model("User", userSchema);