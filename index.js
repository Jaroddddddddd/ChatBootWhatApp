const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const qrcode = require('qrcode-terminal');
const {Client} = require('whatsapp-web.js')
const config = require('./src/config');
const axios = require('axios').default;

const app = express();

// Nos muestra la ruta del archivo de sesion 
const SESSION_FILE_PATH = './session.json';

let sessionData;

const insertrouEntre = require('./src/routes/insertEntrenador.routes');
const insertrouPlan = require('./src/routes/insertPlan.routes');
const insertrouRutina = require('./src/routes/insertRutina.routes');
const Entrenadorrouter = require('./src/routes/entrenador.routes');
const Planrouter = require('./src/routes/planGimnasio.routes');
const Rutinarouter = require('./src/routes/rutina.routes');




//puerto
app.listen(config.PORT, ()=>{
    console.log(`Servidor funcionando correctamente ${config.PORT}`);
  })

  //conexion
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Conectado a la base de datos');
}).catch(err => console.log(err));


app.use(insertrouEntre);
app.use(insertrouPlan);
app.use(insertrouRutina);
app.use(Entrenadorrouter);
app.use(Planrouter);
app.use(Rutinarouter);




const escucharmensaje = () => {
  client.on('message', (mensajes)=>{
    const {from, to, body} =mensajes;
    let mensajebot =  [
      "Planes",
      "Rutina",
      "coach",
      "Opciones",
      "Registro",
      "Ubicación",
      "Salir",
      "Gracias"
  ]       
  if(mensajebot.includes(body)){
      switch (body){

        case 'Planes':
          let planesgym = [];
          axios.get('http://localhost:3546/api/plangimnasio')
          .then(datos => {
              for ( let datosreco of datos.data ){
                planesgym.push(`\n Tipo de plan: ${datosreco.TipodePlan} \n Tiempo del plan:${datosreco.TiempodePlan}\n Cuota del plan: ${datosreco.cuota}`)
              }

              let Planesenviar = planesgym.toString()
              sendMessage (from, Planesenviar)
              sendMessage (from, '\n Si desea volver al menú Principal, Ingrese👉--> Opciones \n\n Si desea realizar la compra de una membresia del plan disponible ingrese😎--> Registro')
            }) 
            break;

          case 'Rutina':
            let ruti = [];
            axios.get('http://localhost:3546/api/rutina')
            .then(datos => {
                for ( let datosreco of datos.data ){
                  ruti.push(`\n Tipo de Rutina: ${datosreco.TipodeRutina} \n Duración:${datosreco.Duracion}\n  Nombre del Entrenador: ${datosreco.NombredeEntrenador}`)
                }

                let rutienviar = ruti.toString()
                sendMessage (from, rutienviar)
                sendMessage (from, '\n Si desea volver al menú Pincipal, Ingrese👉--> Opciones \n\nSi desea realizar la compra de una membresia del plan disponible ingrese😎 --> Registro')
              }) 
              break;

            
          case 'Coach':
            let entrena = [];
            axios.get('http://localhost:3546/api/entrenador')
            .then(datos => {
              for ( let datosreco of datos.data ){
                entrena.push(`\n Nombre: ${datosreco.Nombre} \n Apellido:${datosreco.Apellido}\n  Especialidad:${datosreco.Especialidad}`)
              }

              let entrenaenviar = entrena.toString()
              sendMessage (from, entrenaenviar)
              sendMessage (from, '\nSi desea volver al menú Principal, Ingrese👉--> Opciones \n\nSi desea realizar la compra de una membresia del plan disponible ingrese😎 --> Registro')
            }) 
            break;

              case 'Opciones':
              sendMessage(from, 'Te mostraremos las siguientes opciones del Total Gym🔥: \n\n🟡Planes \n\n🔵Rutina \n\n 🔴Entrenador  \n\n🔵Registro \n\n🔴Ubicación \n\n🟡Help \n\n🔵Salir \n\n');
              break;

              case 'Registro':
              sendMessage(from, 'El asistente de el Gimnasio Total Gym 💪 se comunicara contigo. \n\n Exitos amig@, Que tenga un excelente día!💞💞')
              break;

              case 'Ubicación':
              sendMessage(from, '📍 Puedes encontrarnos en:\n\n j5 y j4, Manta\n\n📍 Ubicación en Google Maps: https://maps.app.goo.gl/kw2qAveepgfAnLkw6\n\nSi desea volver al menú anterior, Ingrese👉--> Opciones')
              break;

              case 'Salir':
              sendMessage(from, ' ¡Nos vemos pronto, fue un gusto atenderte! 👍👋🏼\n\n*Total Gym* te desea un lindo día!☠🔥')
              break;

              case 'Gracias':
                sendMessage(from, 'A usted y recuerda el mejor gimnasio de Manta lo puedes encontar en Manta Total Gym')
                break;
 
      }
  }else{
      sendMessage(from, '¡Hola! (̶◉͛‿◉̶) soy *arya*\n\nEl asistente virtual de Gimnasio Total Gym👊💪\n\n¿En qué puedo ayudarte? \n\n \n\nSi desea ver el menú ingrese😉👉 --> Opciones');
  }
   console.log(body);
})
}

// Funcion cuando la session ya este inciciada
const WhithSession = () => {
  console.log('Su sesion esta siendo validada WhatsApp.')
  sessionData = require(SESSION_FILE_PATH) // almacenar el archivo que contiene la sessión

  client = new Client({
    session: sessionData
  })

  client.on('ready', () => {
    console.log('El cliente se  encuentra conectado correctamente');
    escucharmensaje();
    //sendMessage();
  });

  // Si existe algún error de autenticación o se cerró la sesión
  client.on('auth_failure', () => {
    console.log('Error de autenticación, vuelva a inicar sesión')
  
  });

  client.initialize();
}

//from= numero  // to: a quien  //body: cuerpo del mensaje
const sendMessage = (to, message) => {
  Client.sendMessage(to, message)
}


// Si aún no tenemos ninguna sesión iniciad, se procedera a generar el qr
const WhithOutSession = () => {
  console.log('No hay una sesión guardada');
  client = new Client();

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('El cliente se encuentra en uso !!!');
    escucharmensaje();
    // connectionReady();
  });

  client.on('authenticated', (session) => {
    // Guardamos las credenciales de sesion para usarlas luego
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.log(err)
      }
    })
  })

// Incializamos el cliente
    client.initialize()

    console.log('Cliente inicializado correctamente')
}




  


// Comprobar si existe una sesión guardada
(fs.existsSync(SESSION_FILE_PATH)) ? WhithSession() : WhithOutSession();

