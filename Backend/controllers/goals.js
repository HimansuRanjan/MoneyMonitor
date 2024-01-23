const Goal = require('../models/Goal');
const User = require('../models/User');

exports.setGoal = async (req, res) =>{
    try {
        const { name, goalAmount } = req.body;

        const goal = await Goal.create({
            name,
            goalAmount
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
        const { name, goalAmount } = req.body;
        const update = await Goal.findByIdAndUpdate(req.params.id, {name, goalAmount} , {new : true});
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
            // const deleted = Goal.deleteOne({_id: req.params.id});
            // if(!deleted){
            //     user.goals.push(req.params.id);
            //     return res.status(404).json({
            //         success: false,
            //         message: "Goal Not Found!",
            //     });
            // }
        }else{
            return res.status(404).json({
                success: false,
                message: "Goal Not Found!",
              });
        }

        const deleted = await Goal.findByIdAndDelete(req.params.id);
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
        const goal_ids = req.user.goals;
        const goals = await Goal.find({ _id: { $in: goal_ids } });

        return res.status(201).json({
            success: true,
            message: "All Goals are: ",
            goals
        }); 
        
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}