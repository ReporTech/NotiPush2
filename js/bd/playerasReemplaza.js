import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_PLAYERAS, Bd } from "./Bd.js" // Actualizado a ALMACEN_PLAYERAS

/**
 * Borra el contenido del almacén PLAYERAS y guarda nuevas playeras.
 * @param {import("../modelo/PLAYERA.js").PLAYERA[]} nuevasPlayeras El array de objetos de playera a guardar.
 */
export async function playerasReemplaza(nuevasPlayeras) { // Cambiado el nombre de la función y el parámetro
  return bdEjecuta(Bd, [ALMACEN_PLAYERAS], transaccion => { // Actualizado a ALMACEN_PLAYERAS
    const almacenPlayeras = transaccion.objectStore(ALMACEN_PLAYERAS) // Actualizado a ALMACEN_PLAYERAS
    almacenPlayeras.clear() // Borra todo el contenido existente en el almacén.
    // Itera sobre el array de nuevas playeras y las agrega al almacén.
    for (const objeto of nuevasPlayeras) {
      almacenPlayeras.add(objeto)
    }
  })
}
