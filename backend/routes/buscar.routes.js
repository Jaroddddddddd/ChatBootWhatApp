const { Router } = require('express')
const router = Router()
const { buscarRespuesta } = require('../controllers')


router.get('/api/resbusqueda', buscarRespuesta);

module.exports = router