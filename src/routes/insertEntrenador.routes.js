const insertEntrenador= require('../controllers/insertarEntrenador.controller')
const express = require('express')
const insertrouEntre = express.Router()

insertrouEntre.post('/insertarentrenador', insertEntrenador)

module.exports = insertrouEntre