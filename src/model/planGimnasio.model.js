const mongoose = require('mongoose')
const { Schema } = mongoose

const PlanesdeGimnasioSchema = new Schema(
  {
    TipodePlan: { type: String },
    TiempodePlan: { type: String },
    cuota: {type: String}
  }
)

module.exports = mongoose.model('PlanesdeGimnasio', PlanesdeGimnasioSchema)