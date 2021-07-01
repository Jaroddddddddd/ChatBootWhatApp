const { app, PORT } = require('./backend/config')
const { home } = require('./backend/middlewares')
const db = require('./backend/database')
const ruta = require('./backend/routes')

// Conexión a la base de datos
db.conexion()

// Insertar datos
db.insertarDatos()

// Usar rutas
/**Se desectructuro de esta manera ya que no se veria muy estetico o bueno
 * no terminaba de convenser y evitar colocar un
 */

app.use([
  ruta.cliente,
  ruta.mostrarEntrenador,
  ruta.Plan,
  ruta.mostrarRutina,
  ruta.todasRespuestas,
  ruta.buscarRespuesta
])

// Si ingresa una url inexistente, muestra la página principal
app.use(home)

// Servidor
app.listen(PORT, ()=>{
  console.log(`Servidor funcionando en el puerto ${PORT}`)
})