const express = require('express')
require('./mongoDB/mongoose')

// routes
const userRoutes = require('./routes/user.routes');
const dashboardRoutes = require('./routes/dashboard.routes')

const cors = require('cors');

const app = express()
app.use(express.json());
app.use(userRoutes);
app.use(dashboardRoutes);

app.options('*', cors());

app.listen('3000', () => console.log('app sucessfully listens brooo'));