const express = require('express')
const routes = require('../routes/treasure-route')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/treasure', routes)

module.exports = app
