const express = require('express')
const authUser = require('../controllers/auth')

const router = express.Router()

router.post('/auth',authUser)

module.exports = router