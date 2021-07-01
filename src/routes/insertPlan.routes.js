const insertPlan= require('../controllers/insertPlan.controllers')
const express = require('express')
const insertrouPlan = express.Router()

insertrouPlan.post('/insertarplan', insertPlan)

module.exports = insertrouPlan