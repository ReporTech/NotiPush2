import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_PLAYERAS, Bd } from "./Bd.js" // Actualizado a ALMACEN_PLAYERAS
import { validaNombre } from "../modelo/validaNombre.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * Agrega una nueva playera a la base de datos.
 *
 * @param {import("../modelo/PLAYERA.js").PLAYERA} modelo El objeto playera a agregar.
 */
export async function playeraAgrega(modelo) { // Cambiado el nombre de la función
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

  // Establece la marca de tiempo de la última modificación.
  modelo.PLA_MODIFICACION = Date.now();
  // Establece el estado de eliminado en 0 (no eliminado).
  modelo.PLA_ELIMINADO = 0;
  // Genera un ID único para el cliente.
  modelo.PLA_ID = creaIdCliente(Date.now().toString());

  // Ejecuta la operación en la base de datos IndexedDB.
  return bdEjecuta(Bd, [ALMACEN_PLAYERAS], transaccion => { // Actualizado a ALMACEN_PLAYERAS
    const almacenPlayeras = transaccion.objectStore(ALMACEN_PLAYERAS); // Actualizado a ALMACEN_PLAYERAS
    almacenPlayeras.add(modelo); // Agrega el modelo de la playera al almacén.
  });
}

// Exporta la función para que pueda ser utilizada en otros módulos HTML.
exportaAHtml(playeraAgrega);
