const express = require('express')
const app = express()
app.use(express.json());
const router = new express.Router()
const Dashboard = require('../mongoDB/models/dashboard');

// Add a new dashboard to the dashboards
app.post('/create-dashboard', (req, res) => {
    const dashboard = new Dashboard(req.body);
    dashboard.save()
        .then(() => {
            res.send(dashboard)
        })
        .catch((error) => {
                res.send(error)
        })
})

// get the list of dashboards
app.get('/dashboards', (req, res) => {
    Dashboard.find({}).then((dashboards) => {
        res.send(dashboards)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/dashboard/:id', (req, res) => {
    const _id = req.params.id
    Dashboard.findById(_id).then((dashboard) => {
        if (!dashboard) {
            return res.status(404).send()
        }
        res.send(dashboard)
    }).catch((e) => {
        res.status(500).send()
    })
})

// delete a dashboard
app.post('/delete-dashboards', (req, res) => {
    Dashboard.deleteMany({ _id: { $in: req.body.dashboards } },
        (error, result) => {
            error ? res.send(error) : res.send(result)                
        })
})

module.exports = router