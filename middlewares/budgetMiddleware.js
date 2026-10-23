const Budget = require('../models/budget.model.js');

module.exports.hasBudget = async (req, res, next) => {

    const budgets = await Budget.find().populate('user');

    const userBudget = budgets.filter((el) => {
        return el.user._id.toString() == res.locals.curruser._id.toString();
    })

    if (!userBudget.length > 0) {
        req.flash('error', 'User must be set budget of current month');
        return res.redirect('/budgets/new');
    }

    next();
};
