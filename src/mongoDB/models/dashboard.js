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
    dashboardCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // here put the ids of the users wishing to join the activity
    people: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]       
})

module.exports = Dashboard;