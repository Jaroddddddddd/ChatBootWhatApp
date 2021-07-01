const insertRutina= require('../controllers//insertRutina.controllers')
const express = require('express')
const insertrouRutina = express.Router()

insertrouRutina.post('/insertarRutina', insertRutina)

module.exports = insertrouRutina