const { body } = require('express-validator');

const validationArr = [

    body('expense.title')
        .notEmpty().withMessage('Title is required')
        .bail()
        .isLength({min:1, max:20})
        .bail(),

    body('expense.amount')
        .notEmpty().withMessage('Amount is required')
        .bail()
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than zero and should be valid number')
        .bail(),

    body('expense.category')
        .notEmpty().withMessage('Category should be required')
        .bail()
        .isIn(["Food", "Travel", "Shopping", "Bills & Utilities", "Entertainment", "Health", "Education", "Groceries", "Rent", "Personal Care", "Other"]).withMessage('Category value must be select from the given values')
        .bail(),

    body('expense.date')
        .notEmpty().withMessage('Date is required')
        .bail()
        .isDate().withMessage('Date should be valid')
        .bail(),

    body('expense.paymentMethod')
        .notEmpty().withMessage('Payment method is required')
        .bail()
        .isIn(["Cash", "UPI", "Credit Card", "Debit Card", "Net Banking", "Other"]).withMessage('Payment method must be from the given values')
        .bail()

]

module.exports = validationArr;