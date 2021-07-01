const mongoose = require('mongoose')
const { Schema } = mongoose

const RutinaSchema = new Schema(
  {
    TipodeRutina: { type: String },
    Duracion: { type: String },
    NombredeEntrenador: {type: String}
  }
)

module.exports = mongoose.model('Rutina', RutinaSchema)