const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const startApp = require('./config/startApp.js');
const User = require('./models/user.model.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userRoutes = require('./routes/user.route.js');
const expenseRoutes = require('./routes/expense.route.js');
const budgetRoutes = require('./routes/budget.route.js');
const ExpressError = require('./utils/expressError.js');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo').default;

const app = express();
const PORT = process.env.PORT;

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.SECRET,
    touchAfter: 24 * 3600
});

store.on('error', (err) => {
    console.log("Session store error", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.engine('ejs', ejsMate);

startApp();

app.use((req, res, next) => {
    res.locals.curruser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/api', expenseRoutes);
app.use('/budgets', budgetRoutes);

app.get("/", async (req, res) => {
    res.render('pages/index.ejs')
});

app.all('/*path', (req, res, next) => {
    next(new ExpressError(404, "The page you're looking for doesn't exist or may have been moved.Let's get you back on track."))
});

app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Some error occured" } = err;
    res.status(statusCode).render('errors/error.ejs', { statusCode, message });
    next()

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});