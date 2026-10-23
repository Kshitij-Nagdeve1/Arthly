const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user.controller.js');
const wrapAsync = require('../utils/wrapAsync.js');
const {signupValidation, loginValidation} = require('../validators/authValidation.js');

router.route('/signup')
    .get(userController.renderSignupForm)
    .post(signupValidation, wrapAsync(userController.signup));

router.route('/login')
    .get(userController.renderLoginForm)
    .post(loginValidation, passport.authenticate('local', { failureRedirect: "/login", failureMessage:true, failureFlash:true}), userController.login);


router.get('/logout', userController.logout);

module.exports = router;