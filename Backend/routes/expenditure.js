const express = require("express");
const {
    expend,
    deleteExpenditure,
    getExpenditure
} = require("../controllers/expenditure");

const { isAuthenticated } = require("../middlewares/auth");
const { isMonthLimitSet } = require("../middlewares/monthexpensecheck");

const router = express.Router();

router.route('/expend').post(isAuthenticated, isMonthLimitSet, expend);

router.route('/getExpenditure').get(isAuthenticated, isMonthLimitSet, getExpenditure);

router.route("/deleteExpense/:id").delete(isAuthenticated, isMonthLimitSet, deleteExpenditure);

module.exports = router;
