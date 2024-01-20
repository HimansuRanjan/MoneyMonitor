const Goal = require('../models/Goal');
const User = require('../models/User');

exports.setGoal = async (req, res) =>{
    try {
        const { name, goalAmount, savedAmount } = req.body;

        if(savedAmount == null) savedAmount = 0;

        const goal = await Goal.create({
            name,
            goalAmount,
            savedAmount
        });

        const user = req.user;
        user.goals.push(goal._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Goal Added Successfully",
            goal
        });

    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

exports.updateGoal = async (req, res) =>{
    try {
        const { name, goalAmount, savedAmount } = req.body;
        const update = await Goal.findByIdAndUpdate(req.params.id, {name, goalAmount, savedAmount} , {new : true});
        if(!update){
            return res.status(404).json({
                success: false,
                message: "Goal Not Found!",
              });
        }

        return res.status(201).json({
            success: true,
            message: "Goal Updated Successfully",
        });
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

exports.deleteGoal = async (req, res) =>{
    try {
        //remove from user's goal list
        const user = req.user;
        const indexToRemove = user.goals.indexOf(req.params.id);

        if (indexToRemove !== -1) {
            user.goals.splice(indexToRemove, 1);
        }else{
            return res.status(404).json({
                success: false,
                message: "Goal Not Found!",
              });
        }

        const deleted = await Goal.findByIdAnddelete(req.params.id);
        if(!deleted){
            return res.status(404).json({
                success: false,
                message: "Goal Not Found!",
              });
        }

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Goal Deleted Successfully",
        });
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

exports.getGoals = async (req, res) =>{
    try {
        const goals = req.user.goals;
         
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}