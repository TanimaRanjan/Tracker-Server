require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongooseURL = require('../config/config')
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

mongoose.connect(mongooseURL.MONGODB, {
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

app.get('/', (request, response) => {
    response.send('HELLO')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})


