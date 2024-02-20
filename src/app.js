const express = require('express')
const app = express()
const path = require('node:path')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

//init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false, limit: '30mb'}))
app.use(express.static(path.join(__dirname, '/public')))

//init database


//init route
app.use('/', require('./route/exercise.route'))
app.get('/ex', (req, res)=>{
    res.send('hello')
})

//handling error


module.exports = app