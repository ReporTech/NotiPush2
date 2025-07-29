import { validaPlayera } from "./validaPlayera.js" // Se actualiza la importación a validaPlayera.js

/**
 * Valida un arreglo de objetos de playera, asegurándose de que cada objeto sea válido.
 *
 * @param {any} objetos El arreglo de objetos a validar, que se espera sean playeras.
 * @returns {import("./PLAYERA.js").PLAYERA[]} Un arreglo de objetos de playera validados.
 * @throws {Error} Si la entrada no es un arreglo o si algún objeto dentro no es una playera válida.
 */
export function validaPlayeras(objetos) { // Se cambia el nombre de la función a validaPlayeras
  // Verifica si la entrada es un arreglo.
  if (!Array.isArray(objetos)) {
    throw new Error("No se recibió un arreglo.");
  }
  /**
   * @type {import("./PLAYERA.js").PLAYERA[]}
   */
  const arreglo = [];
  // Itera sobre cada objeto en el arreglo y lo valida como una playera.
  for (const objeto of objetos) {
    arreglo.push(validaPlayera(objeto)); // Se llama a validaPlayera para cada objeto
  }
  return arreglo;
}
