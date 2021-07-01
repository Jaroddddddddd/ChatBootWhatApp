const fs = require('fs')

const { Cliente, Entrenador, PlanesdeGimnasio, Respuestas , Rutina  } = require('../models')


const insertarDatos = ()=>{
  const archivo = './backend/assets/api.json'

  const mensaje = {
    respuesta: "Datos insertados correctamente"
  }

  if(fs.existsSync(archivo)){
    console.log('La colecciones están en la ruta')

  }else{
    const Cliente = fs.readFileSync('./backend/assets/cliente.json')
    const Entrenador = fs.readFileSync('./backend/assets/entrenador.json')
    const PlanesdeGimnasio = fs.readFileSync('./backend/assets/planesdeGimnasio.json')
    const Respuestas = fs.readFileSync('./backend/assets/respuestas.json')
    const Rutina = fs.readFileSync('./backend/assets/rutina.json')

    const jsonCliente = JSON.parse(Cliente)
    const jsonEntrenador = JSON.parse(Entrenador)
    const jsonPlanesdeGimnasio = JSON.parse(PlanesdeGimnasio)
    const jsonRespuestas = JSON.parse(Respuestas)
    const jsonrutina = JSON.parse(Rutina)

    Cliente.create(jsonCliente)
    Entrenador.create(jsonEntrenador)
    PlanesdeGimnasio.create(jsonPlanesdeGimnasio)
    Respuestas.create(jsonRespuestas)
    Rutina.create(jsonrutina)


    fs.writeFile(archivo, JSON.stringify(mensaje), (err)=>{
      if(err){
        console.log(err)
      }
    })
  }
}

module.exports = insertarDatos