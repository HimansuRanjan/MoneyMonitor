const Expenditure = require('../models/Expenditure');
const MonthLimit = require('../models/MonthLimit');

exports.expend = async (req, res) =>{
    try {
        const {type, amount} = req.body;
        
        const expense = await Expenditure.create({
            type,
            amount,
            datetime: Date.now()
        });

        //add expense to the month list
        const currentMonth = req.currentMonth;
        currentMonth.expenditure.push(expense._id);
        currentMonth.save();

        res.status(200).json({
            success: true,
            message: "Expense done!!!",
            expense
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.deleteExpenditure = async (req, res) =>{
    try {
        const objectToDelete = await Expenditure.findById({_id: req.params.id});

        // Delete from Month Expenditure List
        const requiredMonth = req.currentMonth;
        const indexToRemove = requiredMonth.expenditure.indexOf(req.params.id);
        if (indexToRemove !== -1) {
            requiredMonth.expenditure.splice(indexToRemove, 1);
          }
        await requiredMonth.save();

        //delete from expenditure collection
        const deleted = await Expenditure.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({
                success: false,
                message: "Spend Not Found!",
              });
        }

        res.status(200).json({
            success: true,
            message: "Expense Deleted!",
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.getExpenditure = async (req, res) =>{
    try {
        const expensList = req.currentMonth.expenditure;
        const expenditures = await Expenditure.find({_id: {$in : expensList}});

        let totalExpense = 0;
        expenditures.map((expense)=>{
            totalExpense += expense.amount;
        })

        res.status(200).json({
            success: true,
            message: "All Expense of the Month!",
            expenditures,
            totalExpense
          }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}