const express = require('express')
require('./mongoDB/mongoose')
const Dashboard = require('./mongoDB/models/dashboard.js');

const app = express()

app.use(express.json());

// endpoints

app.post('/create-dashboard', (req, res) => {
    console.log('req.body', req.body);
    const dashboard = new Dashboard(req.body);
    dashboard.save()
        .then(() => {
            res.send(dashboard)
        })
        .catch((error) => {
                res.send(error)
        })
    })

app.listen('3000', () => console.log('app sucessfully listens brooo'));