const { Router } = require('express')
const router = Router()
const { Plan } = require('../controllers')

router.get('/api/planGimnasio', Plan)

module.exports = router