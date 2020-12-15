const mongoose = require('mongoose');

const Dashboard = mongoose.model('Dashboard', {
    activityName: {
        type: String,
        required: true,
        trim: true
    },
    creationDate: {
        type: String,
    },
    people: {
        type: Array,
    }       
})

module.exports = Dashboard;