const express = require("express");
const {
    setexpenditure,
    updateexpenditure
} = require("../controllers/expenditure");

const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route('/setExpense').post(isAuthenticated, setexpenditure);

router.route("/updateExpense/:id").put(isAuthenticated, updateexpenditure);


module.exports = router;
