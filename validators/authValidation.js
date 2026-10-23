const { body } = require('express-validator');

const signupValidation = [

    body('username')
        .notEmpty().withMessage('Username is required')
        .bail()
        .isLength({min:3, max: 20}).withMessage('Username must be contain between 3 to 20 characters')
        .bail(),

    body('email')
        .notEmpty().withMessage('Email is required')
        .bail()
        .isEmail().withMessage('Email must be in correct format')
        .bail()
        .normalizeEmail().withMessage('Email must be in lowercase')
        .bail(),


    body('password')
        .notEmpty().withMessage('Passowrd is required')
        .bail()
        .isString().withMessage('Password must be string')
        .bail()
        .isLength({min:8}).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must be contain uppercase letter')
        .bail()
        .matches(/[0-9]/).withMessage('Password must be contain number')
        .bail(),

]

const loginValidation = [
    body('username')
    .notEmpty().withMessage('Username is required')
    .bail(),

    body('password')
    .notEmpty().withMessage('Password is required')
    .bail()

]

module.exports = {
    signupValidation,
    loginValidation
};