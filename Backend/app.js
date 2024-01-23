const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");

require('dotenv').config({ path: "./config/config.env" });

//Using middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());



//Importing routes
const monthLimit = require("./routes/monthLimit");
const user = require("./routes/user");
const expenditure = require("./routes/expenditure");
const goal = require("./routes/goals");



//using routes
app.use("/user", user);
app.use("/goal", goal);
app.use("/expens", monthLimit);
app.use("/expens", expenditure);


module.exports = app; 
