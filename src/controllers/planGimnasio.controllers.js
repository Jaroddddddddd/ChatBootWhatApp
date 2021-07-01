const { PlanesdeGimnasio } = require('../model')

  async function mostrarPlan(req, res){
    const plangym = await PlanesdeGimnasio.find({})
    res.json(plangym)

}


module.exports = mostrarPlan
