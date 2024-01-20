const express = require("express");
const {
    setMonthLimit,
    updateMonthLimit,
    getmonthLimitByMonth,
    getmonthLimitByYear,
} = require("../controllers/monthLimit");

const { isAuthnticated } = require("../middlewares/auth");

const router = express.Router();

// router.route("/setMonthlyLimit").post(isAuthnticated, setMonthLimit);

// router.route("/updateMonthLimit").post(isAuthnticated, updateMonthLimit);

// router.route('/getmonthLimitByYear').get(isAuthnticated, getmonthLimitByYear);
// router.route('/getmonthLimitByMonth').get(isAuthnticated, getmonthLimitByMonth);

module.exports = router;