const MonthLimit = require('../models/MonthLimit');

exports.setMonthLimit = async (req, res) =>{
    try {
        const {amount, month, year, saved } = req.body;
        const user = req.user;

        //create a month limit object 
        const mon = month ? month : new Date().getMonth();
        const yer = year ? year : new Date().getFullYear();
        
        let monthcheck = await MonthLimit.find({_id: {$in : user.monthlyLimit}, month: mon, year: yer});

        //check for rhe right user
        
        // const index = monthcheck.length>0 ? user.monthlyLimit.indexOf(monthcheck[0]._id) : -1;

        if(monthcheck.length>0){ 
            return res.status(404).json({
                success: false,
                message: "Monthly Limit Already Set for this Month",
              });
        }
        
        const monthLimObj = await MonthLimit.create({
            amount: amount,
            month: mon,
            year: yer,
            saveOnMonth: saved ? saved : 0,
        });

        //adding monthlyList to the user
        user.monthlyLimit.push(monthLimObj._id);
        user.save();

        
        //add to Expenditure and then save

        res.status(200).json({
            success: true,
            message: "Monthly Limit Added!!!",
            monthLimObj
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.updateMonthLimit = async (req, res) =>{
    try {
        let {amount, month, year, saved } = req.body;
        
        //create a month limit object 
        const obj = await MonthLimit.find({_id: req.params.id});

        month = month ? month : obj.month;
        year = year ? year : obj.year;
        saved = saved ? saved : obj.saveOnMonth;

        // let monthcheck = await MonthLimit.find({month: mon, year: yer});
        // if(!monthcheck){
        //     return res.status(404).json({
        //         success: false,
        //         message: "Monthly Limit is not set fot the month. Please Set the Limit for the following Month"
        //       });
        // }

        // obj.month = month;
        // obj.amount = amount;
        // obj.year = year;
        // obj.saveOnMonth = saved;
        // MonthLimit.save();
        const monthListupdate = await MonthLimit.findByIdAndUpdate(req.params.id, {amount, month, year, saveOnMonth: saved}, {new: true});

        if(!monthListupdate){
            return res.status(404).json({
                success: false,
                message: "Monthly Limit not updated!! Try after some time."
              });
        }

        res.status(200).json({
            success: true,
            message: "Monthly Limit Updated!!!"
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.getmonthLimitByMonth = async (req, res) =>{
    try{
        const { month } = req.body;
        const user = req.user;
        const monthList = user.monthlyLimit;

        console.log(monthList);
        console.log(user);


        const limit = await MonthLimit.find({ _id: { $in: monthList }, month: month });

        if(limit.length===0){
            return res.status(404).json({
                success: false,
                message: "Data not found for the month."
              });
        }
        res.status(200).json({
            success: true,
            message: "Monthly Limit",
            limit
          });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.getmonthLimitByYear = async (req,res) =>{
    try{
        const { year } = req.body;
        const monthList = req.user.monthlyLimit;

        const limit = await MonthLimit.find({ _id: { $in: monthList }, year: year });

        if(limit.length===0){
            return res.status(404).json({
                success: false,
                message: "Data not found for the year."
              });
        }
        res.status(200).json({
            success: true,
            message: "Monthly Limit for the year",
            limit
          });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}