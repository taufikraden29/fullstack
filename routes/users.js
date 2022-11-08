const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')

// routing endpoint users utama
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data : users,
        name : "Ramuirta"
    })
})

router.post('/', async(req, res) => {
    // REQEUST DATA
    const { nip, nama, password } = req.body

    const users = await UsersModel.create({
        nip, nama, password
    })
    res.status(200).json({
        data : users,
        name : "add Post Man"
    })
})

router.put('/', async(req, res) => {
    // REQEUST DATA
    const { nip, nama, password, passwordBaru } = req.body

    // CEK ID
    const userData = await UsersModel.findOne({ where: { nip: nip } }) 
    console.log(userData)

    // PASSWORD YG MNCUL DAI DB === password dari inputan
    if(userData.password === password) {
        const users = await UsersModel.update({
            nama, password: passwordBaru
        }, { where: { nip: nip } })
        res.status(200).json({
            users: { updated: users[0] },
            metadata: "Users updated!"
        })
    } else {
        res.status(400).json({
            error: "data invalid, masukan kembali!"
        })
    }
})

module.exports = router