import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { validaPlayera } from "../modelo/validaPlayera.js"
import { ALMACEN_PLAYERAS, Bd } from "./Bd.js" // Actualizado a ALMACEN_PLAYERAS

/**
 * Lista todos los objetos de playeras, incluyendo los que tienen borrado lógico.
 *
 * @returns {Promise<import("../modelo/PLAYERA.js").PLAYERA[]>} Una promesa que resuelve con un arreglo de todos los objetos de playera.
 */
export async function playeraConsultaTodos() { // Cambiado el nombre de la función

  return bdConsulta(Bd, [ALMACEN_PLAYERAS], // Actualizado a ALMACEN_PLAYERAS
    /**
     * @param {(resultado: import("../modelo/PLAYERA.js").PLAYERA[])=>void
     * } resolve
     */
    (transaccion, resolve) => {

      const resultado = []

      // Pide un cursor para recorrer cada objeto que devuelve la consulta.
      const consulta = transaccion.objectStore(ALMACEN_PLAYERAS).openCursor() // Actualizado a ALMACEN_PLAYERAS

      /* onsuccess se invoca por cada uno de los objetos de la consulta y una vez
       * cuando se acaban dichos objetos. */
      consulta.onsuccess = () => {
        /* El cursor correspondiente al objeto se recupera usando
         * consulta.result */
        const cursor = consulta.result
        if (cursor === null) {
          /* Si el cursor vale null, ya no hay más objetos que procesar; por lo
           * mismo, se devuelve el resultado con las playeras recuperadas, usando
           * resolve(resultado). */
          resolve(resultado)
        } else {
          /* Si el cursor no vale null y hay más objetos, el siguiente se obtiene con
           * cursor.value*/
          resultado.push(validaPlayera(cursor.value)) // Se mantiene validaPlayera
          /* Busca el siguiente objeto de la consulta, que se recupera la siguiente
           * vez que se invoque la función onsuccess. */
          cursor.continue()
        }
      }

    })

}
