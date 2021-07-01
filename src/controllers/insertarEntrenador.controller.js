const { Entrenador } = require('../model')

function insertEntrenador(req, res){
  const { body } = req
  Entrenador.create(body)
  res.status(200).send({mensaje: 'Dato insertado correctamente'})
}


module.exports = insertEntrenador
