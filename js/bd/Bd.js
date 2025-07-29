export const ALMACEN_PLAYERAS = "PLAYERAS"; // Se cambia el nombre del almacén de objetos a "PLAYERAS"
export const PLA_ID = "PLA_ID"; // Se cambia el nombre de la constante para el ID a PLA_ID
export const INDICE_NOMBRE_PLAYERA = "INDICE_NOMBRE_PLAYERA"; // Se cambia el nombre del índice
export const PLA_NOMBRE = "PLA_NOMBRE"; // Se cambia el nombre de la constante para el nombre a PLA_NOMBRE
const BD_NOMBRE = "sincronizacion";
const BD_VERSION = 1;

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {

  /* Se solicita abrir la base de datos, indicando nombre y
   * número de versión. */
  const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION);

  // Si se presenta un error, rechaza la promesa.
  solicitud.onerror = () => reject(solicitud.error);

  // Si se abre con éxito, devuelve una conexión a la base de datos.
  solicitud.onsuccess = () => resolve(solicitud.result);

  // Si es necesario, se inicia una transacción para cambio de versión.
  solicitud.onupgradeneeded = () => {

    const bd = solicitud.result;

    // Como hay cambio de versión, borra el almacén si es que existe.
    if (bd.objectStoreNames.contains(ALMACEN_PLAYERAS)) {
      bd.deleteObjectStore(ALMACEN_PLAYERAS);
    }

    // Crea el almacén "PLAYERAS" con el campo llave "PLA_ID".
    const almacenPlayeras =
      bd.createObjectStore(ALMACEN_PLAYERAS, { keyPath: PLA_ID });

    // Crea un índice ordenado por el campo "PLA_NOMBRE" que no acepta duplicados.
    almacenPlayeras.createIndex(INDICE_NOMBRE_PLAYERA, PLA_NOMBRE);
  };

});
