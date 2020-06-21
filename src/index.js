require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('../config/config')
const authRoutes = require('./routes/authRoutes')
const trackRouters = require('./routes/trackRoutes')
const requireAuth = require('./middleware/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRouters)

mongoose.connect(config.MONGODB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo DB ')
})

mongoose.connection.on('error', (error) => {
    console.log('Error connecting to mongo', error)
})

app.get('/', requireAuth, (request, response) => {
    response.send(`you email ${request.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})


