const mongoose = require('mongoose')
const { Schema } = mongoose

const RespuestaSchema = new Schema(
  {
    Pregunta: {type: String},
    Respuesta: { type: String }
  }
)

module.exports = mongoose.model('Respuestas', RespuestaSchema)