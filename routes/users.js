const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

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
    
    const encryptedPassword = await bcrypt.hash(password, 10)

    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
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
    const compare = await passwordCheck(nip, password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
    
    // PASSWORD YG MNCUL DAI DB === password dari inputan
    if(compare === true) {
        const users = await UsersModel.update({
            nama, password: encryptedPassword
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
router.post('/login', async (req, res) => {
    const { nip, password } = req.body
    const compare = await passwordCheck(nip, password)
    if( compare === true){
            res.status(200).json({
                users: users,
                metadata: "Login Success"
            })
        } else {
            res.status(400).json({
                error: "data invalid"
            })
        }
})

module.exports = router