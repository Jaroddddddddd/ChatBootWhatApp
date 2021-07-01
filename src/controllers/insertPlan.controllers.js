const { PlanesdeGimnasio } = require('../model');

function insertPlan(req, res){
  const {body} = req
  PlanesdeGimnasio.create(body)
  res.status(200).send({mensaje: 'Dato insertado correctamente'})
}



module.exports = insertPlan
