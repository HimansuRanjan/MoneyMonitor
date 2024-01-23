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

router.route("/updateGoal/:id").put(isAuthenticated, updateGoal);

router.route("/deleteGoal/:id").delete(isAuthenticated, deleteGoal);

router.route("/getGoals").get(isAuthenticated, getGoals);

module.exports = router;