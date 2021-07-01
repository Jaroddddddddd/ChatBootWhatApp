const express = require('express')
const  mostrarEntrenador  = require('../controllers/entrenador.controllers')
const Entrenadorrouter = express.Router()

Entrenadorrouter.get('/api/entrenador', mostrarEntrenador)
module.exports = Entrenadorrouter
