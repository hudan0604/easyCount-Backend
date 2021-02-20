const express = require('express')
require('./mongoDB/mongoose')

// routes
const userRoutes = require('./routes/user.routes');
const dashboardRoutes = require('./routes/dashboard.routes')
const expenseRoutes = require('./routes/expense.routes')

const cors = require('cors');

const app = express()
app.use(express.json());
app.use(userRoutes);
app.use(dashboardRoutes);
app.use(expenseRoutes);

module.exports = app;

app.options('*', cors());
