const { Rutina } = require('../models')

const mostrarRutina = async (req, res)=>{
  try{
    const respuesta = await Rutina.find({}, {
      "_id":0, "__v":0
    })
    res.json(respuesta)
  }catch(err){
    res
      .status(400)
      .json({ err })
  }
}

module.exports = mostrarRutina