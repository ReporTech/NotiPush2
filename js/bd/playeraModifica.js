import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaId } from "../modelo/validaId.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { ALMACEN_PLAYERAS, Bd } from "./Bd.js" // Actualizado a ALMACEN_PLAYERAS
import { playeraBusca } from "./playeraBusca.js" // Actualizado a playeraBusca

/**
 * Modifica los datos de una playera existente en la base de datos.
 *
 * @param { import("../modelo/PLAYERA.js").PLAYERA } modelo El objeto playera con los datos a modificar.
 */
export async function playeraModifica(modelo) { // Cambiado el nombre de la función
  // Valida el nombre de la playera.
  validaNombre(modelo.PLA_NOMBRE);
  // Valida el modelo de la playera.
  validaNombre(modelo.PLA_MODELO);
  // Valida la talla de la playera.
  validaNombre(modelo.PLA_TALLA);
  // Valida la tela de la playera.
  validaNombre(modelo.PLA_TELA);
  // Valida el color de la playera.
  validaNombre(modelo.PLA_COLOR);

  // Verifica que el ID de la playera esté definido.
  if (modelo.PLA_ID === undefined) {
    throw new Error(`Falta PLA_ID de ${modelo.PLA_NOMBRE}.`);
  }
  // Valida el ID de la playera.
  validaId(modelo.PLA_ID);

  // Busca la playera existente en la base de datos.
  const anterior = await playeraBusca(modelo.PLA_ID);
  // Si la playera existe, procede con la modificación.
  if (anterior !== undefined) {
    // Actualiza la marca de tiempo de modificación a la actual.
    modelo.PLA_MODIFICACION = Date.now();
    // Mantiene el estado de eliminado que tenía la playera (no se cambia aquí).
    modelo.PLA_ELIMINADO = 0; // Asumiendo que al modificar, no está eliminada lógicamente.

    // Ejecuta la operación de actualización en la base de datos IndexedDB.
    return bdEjecuta(Bd, [ALMACEN_PLAYERAS], transaccion => { // Actualizado a ALMACEN_PLAYERAS
      const almacenPlayeras = transaccion.objectStore(ALMACEN_PLAYERAS); // Actualizado a ALMACEN_PLAYERAS
      almacenPlayeras.put(modelo); // Actualiza el modelo de la playera en el almacén.
    });
  }
}

exportaAHtml(playeraModifica); // Actualizado a playeraModifica
