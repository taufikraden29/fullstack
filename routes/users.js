const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')

// routing endpoint users utama
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data : "suka makan",
        name : "Ramuirta"
    })
})

module.exports = router