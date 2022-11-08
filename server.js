// jangan dipikir
const express = require('express')
const cors = require('cors')
const port = 3100

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('Database Ready!'))

// pikirin
const userEndpoint = require('./routes/users')
const absensiEndpoint = require('./routes/absensi')

// jangan dipikir
const app = express()
app.use(cors())
app.use(express.json())

// pikirin
app.use('/users', userEndpoint)
app.use('/absensi', absensiEndpoint)

// jangan dipikir
app.listen(port, () => console.log(`running server on port ${port}`))