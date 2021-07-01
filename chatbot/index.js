const fs = require('fs')
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios').default;


// Nos muestra la ruta del archivo de sesion 
const SESSION_FILE_PATH = './session.json';

let ClientWss;
let sessionData;

// Funcion cuando la session ya este inciciada
const WhithSession = () => {
  console.log('Su sesion esta siendo validada WhatsApp.')
  sessionData = require(SESSION_FILE_PATH) // almacenar el archivo que contiene la sessión

  ClientWss = new Client({
    session: sessionData
  })

  ClientWss.on('ready', () => {
    console.log('El cliente se  encuentra conectado correctamente');
  });

  // Si existe algún error de autenticación o se cerró la sesión
  ClientWss.on('auth_failure', () => {
    console.log('Error de autenticación, vuelva a inicar sesión')
  });

  ClientWss.initialize()
}




// Si aún no tenemos ninguna sesión iniciad, se procedera a generar el qr
const WhithOutSession = () => {
  console.log('No hay una sesión guardada');
  ClientWss = new Client();

  ClientWss.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  })

  ClientWss.on('authenticated', (session) => {
    // Guardamos las credenciales de sesion para usarlas luego
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.log(err)
      }
    })
  })

// Incializamos el cliente
  ClientWss.initialize()
  console.log('Cliente inicializado correctamente')
}





//from= numero  // to: a quien  //body: cuerpo del mensaje
const enviarMensaje = (to, message) => {
  ClientWss.sendMessage(to, message)
}


// Comprobar si existe una sesión guardada
(fs.existsSync(SESSION_FILE_PATH)) ? WhithSession() : WhithOutSession()






// Consultando respuestas con la ruta

const  respuestas= () => {
  ClientWss.on('message', (msg) => {
    const { from, to, body } = msg
    let mensaje = formatearTexto(body)
    axios.get(`http://localhost:3001/api/respuesta${mensaje}`)
      .then(res => {
        for (const index of res.data) {
          enviarMensaje(from, index.respuesta)
        }
      }).catch(err => console.log(err))
  })
}

//consultando los clientes
const clientes = () => {
  ClientWss.on('message', (msg) => {

    let arr = []
    arr.push('*Clientes*')
    const { from, to, body } = msg
    axios.get(`http://localhost:3001/api/cliente`)
      .then(res => {
        for (const index of res.data) {
          arr.push(`*${index.Nombre}*\n Apellido: ${index.Apellido}\nEdad: ${index.Edad}\nCorreo: ${index.Correo}\nPeso: ${index.Peso}`)
        }
        let str = arr.toString().replace(/,/g, '\n\n')

        if (formatearTexto(body) === 'clientes') {
          enviarMensaje(from, str)
        }
      }).catch(err => console.log(err))
  })
}



// Consultando los entrenadores
const entrenadores = () => {
  ClientWss.on('message', (msg) => {
    let arr = []
    arr.push('*entrenadores*')
    const { from, to, body } = msg
    axios.get(`http://localhost:3001/api/Entrenador`)
      .then(res => {
        for (const index of res.data) {
          arr.push(`*${index.Nombre}*\nApellido: $${index.Apellido}\nEspecialidad:\n${index.Especialidad}`)
        }
        let str = arr.toString().replace(/,/g, '\n\n')
        if (formatearTexto(body) === 'entrenadores') {
          enviarMensaje(from, str)
        }
      }).catch(err => console.log(err))
  })
}

//consultando los planes disponibles en el gimnasio
const planesdeGimnasios = () => {
  ClientWss.on('message', (msg) => {
    let arr = []
    arr.push('*planesdeGimnasios*')
    const { from, to, body } = msg
    axios.get(`http://localhost:3001/api/planGimnasio`)
      .then(res => {
        for (const index of res.data) {
          arr.push(`*tipo de plan: ${index.TipodePlan}*\nTiempo del plan: $${index.TiempodePlan}\nCuota:\n${index.cuota}`)
        }
        let str = arr.toString().replace(/,/g, '\n\n')
        if (formatearTexto(body) === 'planesdeGimnasios') {
          enviarMensaje(from, str)
        }
      }).catch(err => console.log(err))
  })
}

//consultando los planes disponibles en el gimnasio
const rutinas = () => {
  ClientWss.on('message', (msg) => {
    let arr = []
    arr.push('*rutinas*')
    const { from, to, body } = msg
    axios.get(`http://localhost:6000/api/rutina`)
      .then(res => {
        for (const index of res.data) {
          arr.push(`*tipo de rutina: ${index.TipodeRutina}*\nDuración: $${index.Duracion}\nNombre del entrenador\n${index.NombredeEntrenador}`)
        }
        let str = arr.toString().replace(/,/g, '\n\n')
        if (formatearTexto(body) === 'planesdeGimnasios') {
          enviarMensaje(from, str)
        }
      }).catch(err => console.log(err))
  })
}

respuestas()
clientes()
entrenadores()
planesdeGimnasios()
rutinas()