const express = require("express");
const {
    setMonthLimit,
    updateMonthLimit,
    getmonthLimitByMonth,
    getmonthLimitByYear,
} = require("../controllers/monthLimit");

const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/setMonthlyLimit").post(isAuthenticated, setMonthLimit);

router.route("/updateMonthLimit/:id").put(isAuthenticated, updateMonthLimit);

router.route('/getmonthLimitByYear').get(isAuthenticated, getmonthLimitByYear);

router.route('/getmonthLimitByMonth').get(isAuthenticated, getmonthLimitByMonth);

module.exports = router;