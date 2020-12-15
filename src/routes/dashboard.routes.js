const express = require('express')
const router = new express.Router()
const Dashboard = require('../mongoDB/models/dashboard');

const auth = require('../middleware/auth');

// Add a new dashboard to the dashboards
router.post('/create-dashboard', auth, (req, res) => {
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
router.get('/dashboards', auth, (req, res) => {
    Dashboard.find({}).then((dashboards) => {
        res.send(dashboards)
    }).catch((error) => {
        res.status(500).send()
    })
})

router.get('/dashboard/:id', auth, (req, res) => {
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
router.post('/delete-dashboards', auth, (req, res) => {
    Dashboard.deleteMany({ _id: { $in: req.body.dashboards } },
        (error, result) => {
            error ? res.send(error) : res.send(result)                
        })
})

module.exports = router