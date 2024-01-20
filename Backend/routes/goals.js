const express = require('express');
const {
    setGoal,
    updateGoal,
    deleteGoal,
    getGoals
} = require("../controllers/goals")

const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/setGoal").post(isAuthenticated, setGoal);



module.exports = router;