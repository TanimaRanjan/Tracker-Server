const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const config = require('../../config/config')

const router = express.Router()

router.post('/signup', async (request, response) => {
    
    const { email, password} = request.body
    console.log(email, password)
    try {
        const user = new User({email, password})
        await user.save()

        const token = jwt.sign({userId:user._id}, config.SECRET_KEY)

        response.send({
            token
        })
    } catch(error) {
        return response.status(422).send(error.message)
    }
   
})

module.exports = router