const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Dashboard = require('./dashboard')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid !')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
    }    
})

userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_PASSWORD)
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    } 
  next()  
})

// Delete user dashboards when user chooses to close his account
userSchema.pre('remove', async function (next) {
    const user = this
    await Dashboard.deleteMany({dashboardCreator: user._id})

    next()  
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
    throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    throw new Error('Unable to login')
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User;