function formatearTexto(texto) {
    let tilde = texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"")
    let palabra = tilde.toLowerCase().trim()
    return palabra
  }
  
  module.exports = formatearTexto