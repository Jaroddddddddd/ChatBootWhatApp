const { Respuestas } = require('../models')

const buscarRespuesta = async (req, res)=>{
  const { busqueda } = req.params
  try{
    const respuesta = await Respuestas.find({"pregunta": busqueda}, {
      "respuesta":1, "_id":0
    })
    res.json(respuesta)
  }catch(err){
    res
      .status(400)
      .json({ err })
  }
}

module.exports = buscarRespuesta