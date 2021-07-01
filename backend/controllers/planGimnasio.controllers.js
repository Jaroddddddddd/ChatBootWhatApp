const { PlanesdeGimnasio } = require('../models')

const Plan = async (req, res)=>{
  try{
    const respuesta = await PlanesdeGimnasio.find({}, {
      "_id":0, "__v":0
    })
    res.json(respuesta)
  }catch(err){
    res
      .status(400)
      .json({ err })
  }
}

module.exports = Plan