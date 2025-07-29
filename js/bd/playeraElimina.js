import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_PLAYERAS, Bd } from "./Bd.js" // Actualizado a ALMACEN_PLAYERAS
import { playeraBusca } from "./playeraBusca.js" // Actualizado a playeraBusca

/**
 * Elimina lógicamente una playera de la base de datos.
 *
 * @param {string} id El ID de la playera a eliminar.
 */
export async function playeraElimina(id) { // Cambiado el nombre de la función
  // Busca la playera por su ID.
  const modelo = await playeraBusca(id);
  // Si la playera existe, procede con la eliminación lógica.
  if (modelo !== undefined) {
    // Actualiza la marca de tiempo de modificación a la actual.
    modelo.PLA_MODIFICACION = Date.now(); // Actualizado a PLA_MODIFICACION
    // Establece el campo de eliminado a 1 (eliminado lógicamente).
    modelo.PLA_ELIMINADO = 1; // Actualizado a PLA_ELIMINADO
    // Ejecuta la operación en la base de datos IndexedDB.
    return bdEjecuta(Bd, [ALMACEN_PLAYERAS], transaccion => { // Actualizado a ALMACEN_PLAYERAS
      const almacenPlayeras = transaccion.objectStore(ALMACEN_PLAYERAS); // Actualizado a ALMACEN_PLAYERAS
      almacenPlayeras.put(modelo); // Actualiza el modelo de la playera en el almacén.
    });
  }
}

exportaAHtml(playeraElimina); // Actualizado a playeraElimina
