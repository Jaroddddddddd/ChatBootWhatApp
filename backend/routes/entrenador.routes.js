const { Router } = require('express')
const router = Router()
const { mostrarEntrenador } = require('../controllers')

router.get('/api/Entrenador', mostrarEntrenador)

module.exports = router