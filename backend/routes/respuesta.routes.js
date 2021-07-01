const { Router } = require('express')
const router = Router()
const { todasRespuestas } = require('../controllers')

router.get('/api/respuesta', todasRespuestas)

module.exports = router