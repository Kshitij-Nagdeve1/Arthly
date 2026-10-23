const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 40
    },

    amount: {
        type: Number,
        required: true,
        min: 1
    },


    category: {
        type: String,
        required: true,
        enum: ["Food", "Travel", "Shopping", "Bills & Utilities", "Entertainment", "Health", "Education", "Groceries", "Rent", "Personal Care", "Other"]
    },

    date: {
        type: Date,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true,
        enum: ["Cash", "UPI", "Credit Card", "Debit Card", "Net Banking", "Other"]
    },

    notes: {
        type: String,
        default:'Every decision starts with you',
        set: (v) => v === "" ? "Every decision starts with you" : v
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    monthYear: {
        type:String,
        required:true
    }
}, {
    timestamps: true
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;