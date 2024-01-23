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

    // usage: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Usage",
    //     }
    //   ]
    monthlyLimit:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MonthLimit"
      }
    ],

    saved: {
      type: Number
    },

    goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal"
      }
    ],
});

module.exports = mongoose.model("User", userSchema);