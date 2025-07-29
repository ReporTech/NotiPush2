/**
 * Valida un nombre asegurándose de que no sea una cadena vacía.
 *
 * @param {string} nombre El nombre a validar.
 * @throws {Error} Si el nombre es una cadena vacía, lanza un error indicando que falta el nombre.
 */
export function validaNombre(nombre) {
  // Comprueba si el nombre proporcionado es una cadena vacía.
  if (nombre === "") {
    // Si el nombre está vacío, lanza un nuevo Error.
    throw new Error("Falta el nombre.");
  }
}
