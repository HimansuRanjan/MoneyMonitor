const Expenditure = require("../models/Expenditure");
const MonthLimit = require("../models/MonthLimit")

exports.isMonthLimitSet = async (req, res, next) =>{
    try {
        let month = 0, year = 0;
        if(req.params.id){
            const expenseObj = await Expenditure.findById({_id: req.params.id});
            month = expenseObj.datetime.getMonth()
            year = expenseObj.datetime.getFullYear();
        }else{
            month = req.body.month ? req.body.month : new Date().getMonth();
            year = new Date().getFullYear();
        }
        const monthList = req.user.monthlyLimit;
        const monthcheck = await MonthLimit.find({ _id: { $in: monthList }, month, year });

        if(monthcheck.length===0){
            return res.status(404).json({
                success: false,
                message: "Data Limit not set for the month."
            });
        }

        req.currentMonth = await MonthLimit.findById({_id: monthcheck[0]._id});
        
        next();
    } catch (error) {
       return res.status(501).json({
        success: false,
        message: error.message,
       }) 
    }
}