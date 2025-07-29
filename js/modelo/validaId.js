/**
 * Valida un identificador (ID) asegurándose de que no sea una cadena vacía.
 *
 * @param {string} id El identificador a validar.
 * @throws {Error} Si el ID es una cadena vacía, lanza un error indicando que falta el ID.
 */
export function validaId(id) {
  // Comprueba si el ID proporcionado es una cadena vacía.
  if (id === "") {
    // Si el ID está vacío, lanza un nuevo Error.
    throw new Error("Falta el id.");
  }
}
