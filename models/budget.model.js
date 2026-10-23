const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    totalBudget: {
        type: Number,
        min:1,
        required: true
    },

    month: {
        type: Number,
        required: true,
        enum:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },

    year: {
        type: Number,
        min:2000,
        max:2100,
        required: true
    },

    totalSpent: {
        type: Number
    },

    totalBalance: {
        type: Number
    }

}, {
    timestamps: true
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;