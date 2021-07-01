const { Router } = require('express')
const router = Router()
const { cliente } = require('../controllers')

router.get('/api/cliente', cliente);

module.exports = router