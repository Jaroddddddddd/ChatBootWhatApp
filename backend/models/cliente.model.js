const mongoose = require('mongoose')
const { Schema } = mongoose

const ClienteSchema = new Schema(
  {
    Nombre: { type: String },
    Apellido: { type: String },
    Edad: { type: String },
    Correo: {type: String},
    Peso: {type: String}

  }
)

module.exports = mongoose.model('Cliente', ClienteSchema)