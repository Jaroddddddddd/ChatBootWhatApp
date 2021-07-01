const { Entrenador } = require('../models')

const mostrarEntrenador = async (req, res)=>{
  try{
    const respuesta = await Entrenador.find({}, {
      "_id":0, "__v":0
    })
    res.json(respuesta)
  }catch(err){
    res
      .status(400)
      .json({ err })
  }
}

module.exports = mostrarEntrenador