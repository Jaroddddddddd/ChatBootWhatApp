const express = require('express')
const mostrarRutina = require('../controllers/rutina.controllers')
const Rutinarouter = express.Router()

Rutinarouter.get('/api/rutina', mostrarRutina)

module.exports = Rutinarouter



