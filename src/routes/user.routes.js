const express = require('express')
const router = new express.Router()
const User = require('../mongoDB/models/user');

router.post('/log-in', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/create-user', async (req, res) => {
    const user = await new User(req.body)
    user.save()
        .then(() => {
            res.send(user)
        })
        .catch((error) => {
                res.send(error)
        })
})

module.exports = router