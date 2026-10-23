const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const budgetController = require('../controllers/budget.controller');
const formValidation = require('../validators/budgetValidation.js');
const { isLoggedIn } = require('../middlewares/authMiddleware.js');
const { hasBudget } = require('../middlewares/budgetMiddleware.js');

router.get('/new', isLoggedIn, budgetController.renderBudgetForm);

router.post('/', isLoggedIn, formValidation, wrapAsync(budgetController.setBudget));

router.route('/edit/:id')
    .get(isLoggedIn, hasBudget, wrapAsync(budgetController.renderEditForm))
    .patch(isLoggedIn, hasBudget, formValidation, wrapAsync(budgetController.editBudget));

module.exports = router;