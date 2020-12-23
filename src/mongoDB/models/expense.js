const mongoose = require('mongoose');

const Expense = mongoose.model('Expense', {
    expenseName: {
        type: String,
        required: true,
        trim: true
    },
    creationDate: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    paiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    forPeople: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    dashboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dashboard'
    }
})

module.exports = Expense;