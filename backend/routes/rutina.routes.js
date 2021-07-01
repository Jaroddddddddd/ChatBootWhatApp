const { Router } = require('express')
const router = Router()
const { mostrarRutina } = require('../controllers')

router.get('/api/rutina', mostrarRutina)

module.exports = router