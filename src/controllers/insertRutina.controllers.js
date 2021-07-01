const { Rutina } = require('../model')

function insertRutina(req, res){
  const {body } = req
  Rutina.create(body)
  res.status(200).send({mensaje: 'Dato insertado correctamente'})
}


module.exports = insertRutina
