const Expense = require("../models/expense.model");

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'User must be logged in')
        return res.redirect('/')
    }

    next();
};


module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;

    let expense = await Expense.findById(id).populate('user');

    if (!expense.user._id.equals(res.locals.curruser._id)) {
        req.flash('error', 'You do not have permission')
        return res.redirect('/api/dashboard');
    }

    next();

}