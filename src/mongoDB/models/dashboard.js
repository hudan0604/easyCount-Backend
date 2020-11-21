const mongoose = require('mongoose');

const Dashboard = mongoose.model('Dashboard', {
    activityName: {
        type: String,
        required: true,
        trim: true
    },
    // people: [        
    // ]
})

module.exports = Dashboard;