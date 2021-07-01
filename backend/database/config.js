const mongoose = require('mongoose')
const { MONGO_URI } = require('../config')

const conexion = () => {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
      console.log('Conexión correcta a la base de datos')
    })
    .catch(err =>{
      console.error(err)
    })
}

module.exports = conexion