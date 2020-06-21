const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router()

router.use(requireAuth)

router.get('/tracks', async(request, response) => {
    const tracks = await Track.find({userId:request.user._id})
    response.send(tracks)
})

router.post('/tracks', async (request, response) => {

    const { name, locations } = request.body
    console.log('/TRACKS ', name, locations)
    if(!name || !locations)  {
       return response.status(422).send({ error : 'You must provide name and location '})
    }

    try {
        const track = new Track({name, locations, userId:request.user._id})
        await track.save()
        response.send(track)
    } catch (error) {
        response.status(422).send({error:error.message})
    }
})

module.exports = router