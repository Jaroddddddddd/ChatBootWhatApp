const mongoose = require('mongoose')
const { Schema } = mongoose

const EntrenadorSchema = new Schema(
  {
    Nombre: { type: String },
    Apellido: { type: String },
    Especialidad: { type: String }
  }
)

module.exports = mongoose.model('Entrenador', EntrenadorSchema)