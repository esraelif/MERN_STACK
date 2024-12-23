
const AuthSchema = require('../models/auth.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




const register = async (require, res) => {
    try {
        const { username, password, email } = req.body
        const user = await AuthSchema.findOne(email)
        if (user) {
            return res.status(500).json({ msg: 'There is such a user!' })
        }
        if (password.length < 6) {
            return res.status(500).json({ msg: 'Your password must not be less than 6 characters' })
        }
        const passwordHash = await bcrypt.hash(password, 12)
        if (!isEmail(email)) {
            return res.status(500).json({ msg: 'Invalid email address' })
        }

        const newUser = await AuthSchema.create({ username, email, password: passwordHash })
        const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", { expiresIn: '1h' })
        res.status(201).json({
            status: 'OK',
            newUser,
            token
        })

    } catch (error) {

    }
}

const login = async (require, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ msg: "error.message" })
    }
}
function isEmail(emailAddress) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailAddress.match(regex))
        return true;
    else
        return false;
}

module.exports = { register, login }