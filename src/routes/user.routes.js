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
    if (User.findOne({ email: req.body.email })) {
        res.status(409).send({ reason: 'This email address is already used by an existing user !!!' })
    } else {
        const user = await new User(req.body)
        user.save()
            .then(() => {
                res.send(user)
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    }
})

router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send()
    }
 })

module.exports = router