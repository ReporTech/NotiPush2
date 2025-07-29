import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaPlayera } from "../modelo/validaPlayera.js"
import { ALMACEN_PLAYERAS, Bd, INDICE_NOMBRE_PLAYERA } from "./Bd.js" // Actualizado a ALMACEN_PLAYERAS e INDICE_NOMBRE_PLAYERA

/**
 * Consulta las playeras que no han sido eliminadas de la base de datos.
 *
 * @returns {Promise<import("../modelo/PLAYERA.js").PLAYERA[]>} Una promesa que resuelve con un arreglo de objetos de playera no eliminadas.
 */
export async function playeraConsultaNoEliminadas() { // Cambiado el nombre de la función

  return bdConsulta(Bd, [ALMACEN_PLAYERAS], // Actualizado a ALMACEN_PLAYERAS
    /**
     * @param {(resultado: import("../modelo/PLAYERA.js").PLAYERA[])=>void
     * } resolve
     */
    (transaccion, resolve) => {

      const resultado = []

      const almacenPlayeras = transaccion.objectStore(ALMACEN_PLAYERAS) // Actualizado a ALMACEN_PLAYERAS

      // Usa el índice INDICE_NOMBRE_PLAYERA para recuperar los datos ordenados.
      const indiceNombre = almacenPlayeras.index(INDICE_NOMBRE_PLAYERA) // Actualizado a INDICE_NOMBRE_PLAYERA

      // Pide un cursor para recorrer cada objeto que devuelve la consulta.
      const consulta = indiceNombre.openCursor()

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
           * cursor.value */
          const modelo = validaPlayera(cursor.value)
          if (modelo.PLA_ELIMINADO === 0) { // Actualizado a PLA_ELIMINADO
            resultado.push(modelo)
          }
          /* Busca el siguiente objeto de la consulta, que se recupera la siguiente
           * vez que se invoque la función onsuccess. */
          cursor.continue()
        }
      }

    })

}

exportaAHtml(playeraConsultaNoEliminadas) // Cambiado el nombre de la función
