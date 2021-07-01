const { Respuestas } = require('../models')

const todasRespuestas = async (req, res)=>{
  try{
    const respuesta = await Respuestas.find({}, {
      "pregunta":1, "respuesta":1, "_id":0
    })
    res.json(respuesta)
  }catch(err){
    res
      .status(400)
      .json({ err })
  }
}

module.exports = todasRespuestas