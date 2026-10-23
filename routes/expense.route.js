const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller.js');
const wrapAsync = require('../utils/wrapAsync.js');
const formValidation = require('../validators/expressValidation.js');
const { isLoggedIn, isOwner } = require('../middlewares/authMiddleware.js');
const {hasBudget} = require('../middlewares/budgetMiddleware.js');

router.get('/dashboard', isLoggedIn, hasBudget, wrapAsync(expenseController.dashboard));

router.get('/new', isLoggedIn, hasBudget, expenseController.renderExpenseForm);

router.get('/expenses/search', wrapAsync(expenseController.searchResult));

router.get('/expenses/filter', wrapAsync(expenseController.filterResult));

router.route('/expenses')
    .post(isLoggedIn, hasBudget, formValidation, wrapAsync(expenseController.createExpense))
    .get( isLoggedIn, hasBudget , wrapAsync(expenseController.allExpenses));
    
router.get('/expenses/view/:id', isLoggedIn,  hasBudget, isOwner, wrapAsync(expenseController.viewExpense));

router.get('/expenses/edit/:id', isLoggedIn, hasBudget, isOwner, wrapAsync(expenseController.renderEditForm));

router.route('/expenses/:id')
    .patch(isLoggedIn, hasBudget, isOwner ,formValidation, wrapAsync(expenseController.updateExpense))
    .delete( isLoggedIn, hasBudget, isOwner , wrapAsync(expenseController.deleteExpense));


module.exports = router;