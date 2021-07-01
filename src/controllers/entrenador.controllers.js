const { Entrenador } = require('../model')

  async function mostrarEntrenador(req, res){
    const entre = await Entrenador.find({});
    res.json(entre)

}

module.exports = mostrarEntrenador
