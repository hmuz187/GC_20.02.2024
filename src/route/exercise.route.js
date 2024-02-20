const express = require('express')
const router = express.Router()
const path = require('node:path')

router.get('/ex1', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ex1.html'))
})

router.get('/ex2', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ex2.html'))
})

module.exports = router
