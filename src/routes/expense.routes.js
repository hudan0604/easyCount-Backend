const express = require('express')
const router = new express.Router()

const Expense = require('../mongoDB/models/expense');

const auth = require('../middleware/auth');

router.post('/expense/add', auth, async (req, res) => {
    try {
        const expense = new Expense(req.body)
        await expense.save()
        res.status(201).send(expense)
    }
    catch (e) {
       res.status(400).send(e) 
    }
})

// GET all expenses made in a specific dashboard
router.get('/expenses/:dashboardId', auth, async (req, res) => {
    try {
        const dashboardId = req.params.dashboardId
        const expenses = await Expense.find({ dashboardId });
        await expenses.forEach(expense => expense.populate('paiedBy').execPopulate())
        if (!expenses) {console.log('no expenses found for the dashboard')}
        res.send(expenses)
    }
    catch (e) {
        res.send()
    }
})

module.exports = router