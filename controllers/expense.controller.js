const Expense = require('../models/expense.model.js');
const { validationResult } = require('express-validator');
const Budget = require('../models/budget.model.js');

module.exports.dashboard = async (req, res) => {

    const budget = await Budget.find().populate('user');
    const expenses = await Expense.find().populate('user');
    let totalSpent = 0;

    const currentDate = new Date();

    const date = currentDate.toISOString().split('-');
    const currentMonth = date.slice(1, 2)[0];
    const currentYear = date.slice(0, 1)[0];
    const currDateAndMonth = date.slice(0, 2).join(['-']);
    let userBudget;

    const currMonth = new Date(2000, Number(currentMonth) - 1).toLocaleString('en-US', { month: 'long' });


    const userOriginalExpenses = expenses.filter((el) => {
        return (el.user._id.equals(res.locals.curruser._id) && el.monthYear == currDateAndMonth);
    });

    for (let expense of userOriginalExpenses) {
        totalSpent += expense.amount
    }


    userBudget = budget.filter((el) => {
        return (el.user._id.equals(res.locals.curruser._id) && el.month == currentMonth && el.year == currentYear);
    })


    let totalBalance;
    let totalBudget;
    let spentPercentage;
    let balancePercentage;


    if (userBudget && userBudget.length > 0) {
        let userBalance = userBudget[0].totalBudget - totalSpent;
        totalBalance = '₹ ' + userBalance.toLocaleString('en-IN')
        totalBudget = '₹ ' + userBudget[0].totalBudget.toLocaleString('en-IN');

        spentPercentage = Math.round((totalSpent / userBudget[0].totalBudget) * 100);
        balancePercentage = Math.round((userBalance / userBudget[0].totalBudget) * 100);

    } else {
        totalBudget = 'Budget not set';
        totalBalance = 'Budget not set';

    }



    const [...userExpenses] = userOriginalExpenses;

    userExpenses.reverse();

    const userCategoryExpenses = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
                monthYear: currDateAndMonth
            }
        },

        {
            $group: {
                _id: "$category",
                totalAmountSpent: { $sum: "$amount" },
                totalExpenses: { $sum: 1 },
            }
        }

    ]);

    let highestSpendingCategory;

    if(userCategoryExpenses.length > 0) {
         highestSpendingCategory = userCategoryExpenses.reduce((max, el) => {  
            return el.totalAmountSpent > max.totalAmountSpent ? el : max
        })
        }

    let totalAmount = 0;

    for (let eachCategory of userCategoryExpenses) {
        totalAmount += eachCategory.totalAmountSpent
    }

    let categoryData = [];

    for (let eachCategory of userCategoryExpenses) {
        let percentage = Math.round((eachCategory.totalAmountSpent / totalAmount) * 100);
        let category = eachCategory._id;
        let amount = eachCategory.totalAmountSpent;
        categoryData.push({
            category: category,
            amount: amount,
            percentage: percentage
        });
    }

    const categoryIcons = {
        Food: "utensils",
        Travel: "plane",
        Shopping: "shopping-bag",
        'Bills & Utilities': "file-invoice-dollar",
        Entertainment: "film",
        Health: "heartbeat",
        Education: "graduation-cap",
        Groceries: "shopping-cart",
        Rent: "home",
        'Personal Care': "spa",
        Other: "question-circle"
    };

    res.render('expenses/dashboard.ejs', { userBudget, totalBudget, totalSpent, totalBalance, currMonth, spentPercentage, balancePercentage, userExpenses, categoryData, categoryIcons, highestSpendingCategory });
}

module.exports.renderExpenseForm = (req, res) => {
    res.render('expenses/form.ejs');
};

module.exports.createExpense = async (req, res, next) => {

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
        let userExpense = req.body.expense;

        let expense = await Expense(userExpense);

        let expenseDate = userExpense.date.slice(0, 7);

        expense.user = req.user._id;


        expense.monthYear = expenseDate;

        await expense.save();


        req.flash('success', "New expense added successfuly")
        res.redirect('/api/dashboard');

    }
};

module.exports.allExpenses = async (req, res) => {

    let expenses = await Expense.find().populate('user');

    let allExpenses = expenses.filter((el) => {
        return el.user._id.equals(res.locals.curruser._id)
    })

    res.render('expenses/expenses.ejs', { allExpenses });
};

module.exports.viewExpense = async (req, res) => {

    let { id } = req.params;

    let expense = await Expense.findById(id);

    res.render('expenses/view.ejs', { expense })
};

module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;
    let expense = await Expense.findById(id);

    res.render("expenses/edit.ejs", { expense });
};

module.exports.updateExpense = async (req, res) => {


    const error = validationResult(req);

    if (error.errors.length > 0) {
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

        let { id } = req.params;

        let userExpense = req.body.expense

        let expenseDate = userExpense.date.slice(0, 7);

        userExpense.monthYear = expenseDate

        let expense = await Expense.findByIdAndUpdate(id, userExpense);

        res.json({
            message: "Expense updated successfuly",
            redirectUrl: `/api/expenses/view/${id}`
        })
    }

}

module.exports.deleteExpense = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    let expense = await Expense.findByIdAndDelete(id);

    console.log("Expense get deleted")

    res.json({
        message: 'Expense deleted successfully',
        redirectUrl: '/api/expenses'
    });
};

module.exports.searchResult = async (req, res) => {
    let q = req.query.q;
    let id = res.locals.curruser._id;

    let searchResult = await Expense.find({ user: `${id}` })

    const finalResult = searchResult.filter((el) => {
        return el.title.toLowerCase().trim().includes(q.toLowerCase().trim());
    })

    if (!finalResult.length > 0) {
        finalResult = searchResult;
    }

    res.json({
        message: "success",
        result: finalResult
    });

};

module.exports.filterResult = async (req, res) => {

    let userExpenses;
    let category = req.query.category;
    let order = req.query.order;

    console.log(category, order);


    if (order == "" && category == "") {
        userExpenses = await Expense.find({ user: `${req.user._id}` });
    } else if (category == "" && order != "") {

        userExpenses = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id,
                }
            },

            {
                $sort: {
                    amount: Number(order)
                }
            }
        ])

    }
    else {


        if (order == "") {
            order = 1
        }

        userExpenses = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id,
                    category: category
                }
            },

            {
                $sort: {
                    amount: Number(order)
                }
            }
        ])
    }

    res.json({
        message: "success",
        result: userExpenses
    })
};