const { Cliente } = require('../models')

const cliente = async (req, res)=>{
  try{
    const respuesta = await Cliente.find({}, {
      "_id":0, "__v":0
    })
    res.json(respuesta)
  }catch(err){
    res
      .status(400)
      .json({ err })
  }
}

module.exports = cliente