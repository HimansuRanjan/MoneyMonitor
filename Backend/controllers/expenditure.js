const Expenditure = require('../models/Expenditure');
const MonthLimit = require('../models/MonthLimit');

exports.setexpenditure = async (req, res) =>{
    try {
        const {monthlyLimit, saved, month, year} = req.body;
        
        

        //create a month limit object 
        const mon = month ? month : new Date().getMonth();
        const yer = year ? year : new Date().getFullYear();

        let monthcheck = await MonthLimit.findOne({mon});
        if(monthcheck && await MonthLimit.findOne(monthcheck.year)){
            return res.status(404).json({
                success: false,
                message: "Monthly Limit Already Set for this Month",
              });
        }
        
        const monthLimObj = await MonthLimit.create({
            amount: monthlyLimit,
            month: mon,
            year: yer
        });

        console.log(monthLimObj);
        //add to Expenditure and then save

        const expenditure = await Expenditure.create({
            monthlyLimit: monthLimObj._id,
            saved
        });

        res.status(200).json({
            success: true,
            message: "Monthly Limit Added!!!",
            expenditure
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.updateexpenditure = async (req, res) =>{
    try {
        const {monthlyLimit, saved} = req.body;

        const expense = await Expenditure.findById(req.params.id);
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Data to set Expenditure Not Found!",
              });
        }
        const upadeteMonthLimit = await MonthLimit.findByIdAndUpdate(expense.monthlyLimit, {amount: monthlyLimit}, { new: true });

        if(!upadeteMonthLimit){
            return res.status(404).json({
                success: false,
                message: "Data to set Expenditure Not Found!",
              });
        }

        expense.saved = saved;
        await expense.save();

        res.status(200).json({
            success: true,
            message: "Monthly Limit Updated!!!",
            expense
          });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}