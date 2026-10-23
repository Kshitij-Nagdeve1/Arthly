const { body } = require('express-validator');

const validationArr = [

    body('budget.totalBudget')
        .notEmpty().withMessage('Budget amount is required')
        .bail()
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than zero and should be valid number')
        .bail(),

    body('budget.month')
        .notEmpty().withMessage('Month is required')
        .bail()
        .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).withMessage('Month must be valid and it should be in cardinal numbers')
        .bail(),


    body('budget.year')
        .notEmpty().withMessage('Year is required')
        .bail()
        .isFloat({ gte: 2000, lte: 2100 })
        .withMessage('Year should be between 2000 to 2100')
        .bail(),


]

module.exports = validationArr;