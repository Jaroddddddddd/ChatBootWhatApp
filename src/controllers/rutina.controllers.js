const { Rutina } = require('../model')

  async function mostrarRutina(req, res){
    const rut = await Rutina.find({})
    res.json(rut)

}

module.exports = mostrarRutina