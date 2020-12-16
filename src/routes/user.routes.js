const express = require('express')
const router = new express.Router()
const User = require('../mongoDB/models/user');

const auth = require('../middleware/auth');

router.post('/users/log-in', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        user.token = token
        res.send(user.getPublicProfile());
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        await user.save()
        res.send(user)
    }
    catch (e) {
        res.status(500).send()
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

router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

module.exports = router