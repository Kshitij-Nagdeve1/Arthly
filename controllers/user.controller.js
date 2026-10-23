const User = require('../models/user.model.js');
const { validationResult } = require('express-validator');

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs')
};

module.exports.signup = async (req, res, next) => {

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

        let { username, email, password } = req.body;

        let user = new User({ username, email })

        let registeredUser = await User.register(user, password);

        await registeredUser.save();

        req.login(registeredUser, ((err) => {
            if (err) {
                return next(err)
            }

            req.flash('success', 'Welcome, account created successfuly!')
            // res.redirect('/api/dashboard')
            res.redirect('/budgets/new')
        }))
    }
};

module.exports.renderLoginForm = (req, res) => {

    if (req.session.messages) {
        req.flash('error', `${req.session.messages}`)
    }

    req.session.messages = [];

    res.render('users/login.ejs')

};

module.exports.login = (req, res) => {

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
        req.flash('success', 'Welcome')
        res.redirect('/api/dashboard');
    }

}

module.exports.logout = (req, res) => {

    req.logout((err) => {
        if (err) {
            throw err
        }
        req.flash('success', 'User logout successfuly')
        res.redirect('/login');
    })
};

