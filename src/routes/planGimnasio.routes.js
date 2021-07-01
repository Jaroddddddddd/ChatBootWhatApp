const express = require('express')
const  mostrarPlan  = require('../controllers/planGimnasio.controllers')
const Planrouter = express.Router()

Planrouter.get('/api/plangimnasio', mostrarPlan)

module.exports = Planrouter
