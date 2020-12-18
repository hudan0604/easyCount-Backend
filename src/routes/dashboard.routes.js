const express = require('express')
const router = new express.Router()
const Dashboard = require('../mongoDB/models/dashboard');

const auth = require('../middleware/auth');

// Add a new dashboard to the dashboards
router.post('/create-dashboard', auth, async (req, res) => {
    const dashboard = new Dashboard({
        ...req.body,
        dashboardCreator: req.user._id,
        people: [req.user._id]
    })

    try {
        await dashboard.save()
        res.status(201).send(dashboard)
    }
    catch (e) {
       res.status(400).send(e) 
    }
})

// get the list of dashboards where user is involved 
// (either he created one or he joined some dashboards)
router.get('/dashboards', auth, (req, res) => {
    Dashboard.find({people: req.user._id}).then((dashboards) => {
        res.send(dashboards)
    }).catch((error) => {
        res.status(500).send()
    })
})

// get the list of dashboards that the auth user has created
router.get('/dashboards-created', auth, (req, res) => {
    Dashboard.find({dashboardCreator: req.user._id}).then((dashboards) => {
        res.send(dashboards)
    }).catch((error) => {
        res.status(500).send()
    })
})

router.get('/dashboard/:id', auth, async (req, res) => {
    const _id = req.params.id
    const dashboard = await Dashboard.findById(_id)
    await dashboard.populate('dashboardCreator').execPopulate()
    await dashboard.populate('people').execPopulate()
    
    if (!dashboard) {
        return res.status(404).send()
    }
    res.send(dashboard)
})

// Add a newly signed in user to an existing dashboard
router.patch('/add-user-to-dashboard/:id', async (req, res) => {
    try {
        const dashboard = await Dashboard.findByIdAndUpdate(req.params.id, { $addToSet: { people: req.body.userId } }, {new: true})
        if (!dashboard) {
            return res.status(404).send()
        }
        res.send(dashboard);
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// delete one or many dashboards
router.post('/delete-dashboards', auth, (req, res) => {
    Dashboard.deleteMany({ _id: { $in: req.body.dashboards } },
        (error, result) => {
            error ? res.send(error) : res.send(result)                
        })
})

module.exports = router