import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaPlayera } from "../modelo/validaPlayera.js" // Se actualiza la importación a validaPlayera.js
import { ALMACEN_PLAYERAS, Bd } from "./Bd.js" // Se actualiza a ALMACEN_PLAYERAS

/**
 * Busca una playera por su ID en la base de datos.
 *
 * @param {string} id El ID de la playera a buscar.
 * @returns {Promise<import("../modelo/PLAYERA.js").PLAYERA|undefined>} Una promesa que resuelve con el objeto playera si se encuentra y no está eliminada, o `undefined` en caso contrario.
 */
export async function playeraBusca(id) { // Se cambia el nombre de la función a playeraBusca

  return bdConsulta(Bd, [ALMACEN_PLAYERAS], // Se actualiza a ALMACEN_PLAYERAS
    /**
     * @param {(resultado: import("../modelo/PLAYERA.js").PLAYERA|undefined) => any} resolve
     */
    (transaccion, resolve) => {

      /* Pide el primer objeto de ALMACEN_PLAYERAS que tenga como llave
       * primaria el valor del parámetro id. */
      const consulta = transaccion.objectStore(ALMACEN_PLAYERAS).get(id) // Se actualiza a ALMACEN_PLAYERAS

      // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
      consulta.onsuccess = () => {
        /* Se recupera el objeto solicitado usando
         * consulta.result
         * Si el objeto no se encuentra se recupera undefined. */
        const objeto = consulta.result
        if (objeto !== undefined) {
          const modelo = validaPlayera(objeto) // Se actualiza a validaPlayera
          if (modelo.PLA_ELIMINADO === 0) { // Se actualiza a PLA_ELIMINADO
            resolve(modelo)
            return
          }
        }
        resolve(undefined)

      }

    })

}

exportaAHtml(playeraBusca) // Se actualiza a playeraBusca
