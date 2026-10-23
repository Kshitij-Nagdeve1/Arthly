const { validationResult } = require('express-validator');
const Budget = require('../models/budget.model.js');

module.exports.renderBudgetForm = (req, res) => {
    res.render('budgets/budgetForm.ejs')
}

module.exports.setBudget = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {

        let msg = "";
        let newArr = [];
        const errArr = error.array();
        errArr.forEach((el) => {
            msg = el.msg;
            return newArr.push(msg)
        })

        console.log(newArr);

        return res.status(400).json({ errors: newArr })
    } else {

        let budget = req.body.budget;
        console.log(budget)

        let newBudget = new Budget(budget);

        newBudget.user = res.locals.curruser._id

        await newBudget.save();

        req.flash('success', 'Budet set successfully')
        res.redirect('/api/dashboard');
    }
};

module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;

    const budget = await Budget.findById(id);

    res.render('budgets/editBudget.ejs', { budget })
}

module.exports.editBudget = async (req, res) => {

    let { id } = req.params;
    let budget = req.body.budget;

    await Budget.findByIdAndUpdate(id, budget);


    res.json({
        message: 'Budget updated successfully',
        redirectUrl:'/api/dashboard'
    });

}