import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { playeraConsultaTodos } from "./bd/playeraConsultaTodos.js" // Actualizado a playeraConsultaTodos
import { playerasReemplaza } from "./bd/playerasReemplaza.js" // Actualizado a playerasReemplaza
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaPlayeras } from "./modelo/validaPlayeras.js" // Actualizado a validaPlayeras
import { renderiza } from "./renderiza.js"

/**
 * Sincroniza los datos de las playeras entre el cliente y el servidor.
 *
 * @param {HTMLUListElement} lista El elemento <ul> donde se renderizarán las playeras.
 */
export async function sincroniza(lista) {
  try {
    if (navigator.onLine) {
      // Consulta todas las playeras locales, incluyendo las eliminadas lógicamente.
      const todos = await playeraConsultaTodos() // Cambiado a playeraConsultaTodos
      // Envía los datos locales al servidor para sincronización.
      const respuesta = await enviaJson("srv/sincroniza.php", todos)
      // Valida la respuesta del servidor como un arreglo de playeras.
      const playeras = validaPlayeras(respuesta.body) // Cambiado a validaPlayeras y variable a 'playeras'
      // Reemplaza las playeras locales con las playeras obtenidas del servidor.
      await playerasReemplaza(playeras) // Cambiado a playerasReemplaza
      // Renderiza la lista de playeras en la interfaz de usuario.
      renderiza(lista, playeras)
    }
  } catch (error) {
    // Muestra cualquier error que ocurra durante la sincronización.
    muestraError(error)
  }
  // Espera un poco y luego intenta sincronizar de nuevo (para sincronización periódica).
  esperaUnPocoYSincroniza(lista)
}

// Exporta la función para que pueda ser utilizada en otros módulos HTML.
exportaAHtml(sincroniza)
