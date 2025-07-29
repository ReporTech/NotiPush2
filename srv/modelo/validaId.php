<?php

/**
 * Valida que un ID no esté vacío.
 *
 * @param string $id El ID a validar.
 * @throws ProblemDetails Si el ID está vacío.
 */
function validaId(string $id)
{
    // Verifica si el ID es una cadena vacía
    if ($id === "") {
        // Si el ID está vacío, lanza una excepción ProblemDetails
        // indicando que falta el ID.
        throw new ProblemDetails(
            status: BAD_REQUEST, // Código de estado HTTP 400 Bad Request
            title: "Falta el id.", // Título del problema
            type: "/error/faltaid.html", // Tipo de error específico
        );
    }
}
