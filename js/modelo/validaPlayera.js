/**
 * Valida un objeto de playera asegurándose de que sus propiedades sean del tipo correcto.
 *
 * @param {any} objeto El objeto a validar, que se espera sea una playera.
 * @returns {import("./PLAYERA.js").PLAYERA} El objeto de playera validado.
 * @throws {Error} Si alguna propiedad no es del tipo esperado, lanza un error.
 */
export function validaPlayera(objeto) {
  // Valida que el ID de la playera sea una cadena.
  if (typeof objeto.PLA_ID !== "string") {
    throw new Error("El ID de la playera debe ser texto.");
  }

  // Valida que el nombre de la playera sea una cadena.
  if (typeof objeto.PLA_NOMBRE !== "string") {
    throw new Error("El nombre de la playera debe ser texto.");
  }

  // Valida que el modelo de la playera sea una cadena.
  if (typeof objeto.PLA_MODELO !== "string") {
    throw new Error("El modelo de la playera debe ser texto.");
  }

  // Valida que la talla de la playera sea una cadena.
  if (typeof objeto.PLA_TALLA !== "string") {
    throw new Error("La talla de la playera debe ser texto.");
  }

  // Valida que la tela de la playera sea una cadena.
  if (typeof objeto.PLA_TELA !== "string") {
    throw new Error("La tela de la playera debe ser texto.");
  }

  // Valida que el color de la playera sea una cadena.
  if (typeof objeto.PLA_COLOR !== "string") {
    throw new Error("El color de la playera debe ser texto.");
  }

  // Valida que la fecha de modificación sea un número.
  if (typeof objeto.PLA_MODIFICACION !== "number") {
    throw new Error("El campo modificación debe ser un número.");
  }

  // Valida que el estado de eliminado sea un número.
  if (typeof objeto.PLA_ELIMINADO !== "number") {
    throw new Error("El campo eliminado debe ser un número.");
  }

  // Si todas las validaciones pasan, retorna el objeto.
  return objeto;
}
