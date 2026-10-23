const sampleData = require('./data.js');
const Expense = require('../models/expense.model.js');
const startApp = require('../config/startApp.js');

startApp();

const initDB = async () => {;
    await Expense.deleteMany({ user: '6ad4a8a36662c3daab06f8fd' });
    await Expense.insertMany(sampleData);
    console.log('Data inserted successfuly');
}

initDB();