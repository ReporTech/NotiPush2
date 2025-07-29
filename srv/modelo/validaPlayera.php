<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_PLAYERA.php"; // Cambiado de TABLA_PASATIEMPO a TABLA_PLAYERA

/**
 * Valida un objeto de playera y devuelve un array con sus propiedades.
 *
 * @param object $objeto El objeto a validar, que representa una playera.
 * @return array Un array asociativo con los datos validados de la playera.
 * @throws ProblemDetails Si alguna propiedad no es válida o está ausente.
 */
function validaPlayera(object $objeto): array // Cambiado el nombre de la función
{
    // Valida y decodifica el JSON del objeto
    $objeto = validaJson($objeto);

    // Valida el ID de la playera
    if (!isset($objeto->PLA_ID) || !is_string($objeto->PLA_ID)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El ID de la playera debe ser texto.",
            type: "/error/idincorrecto.html",
        );
    }

    // Valida el nombre de la playera
    if (!isset($objeto->PLA_NOMBRE) || !is_string($objeto->PLA_NOMBRE)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El nombre de la playera debe ser texto.",
            type: "/error/nombreincorrecto.html",
        );
    }

    // Valida el modelo de la playera
    if (!isset($objeto->PLA_MODELO) || !is_string($objeto->PLA_MODELO)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El modelo de la playera debe ser texto.",
            type: "/error/modeloincorrecto.html",
        );
    }

    // Valida la talla de la playera
    if (!isset($objeto->PLA_TALLA) || !is_string($objeto->PLA_TALLA)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La talla de la playera debe ser texto.",
            type: "/error/tallaincorrecta.html",
        );
    }

    // Valida la tela de la playera
    if (!isset($objeto->PLA_TELA) || !is_string($objeto->PLA_TELA)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La tela de la playera debe ser texto.",
            type: "/error/telaincorrecta.html",
        );
    }

    // Valida el color de la playera
    if (!isset($objeto->PLA_COLOR) || !is_string($objeto->PLA_COLOR)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El color de la playera debe ser texto.",
            type: "/error/colorincorrecto.html",
        );
    }

    // Valida la fecha de modificación de la playera
    if (!isset($objeto->PLA_MODIFICACION) || !is_int($objeto->PLA_MODIFICACION)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "La modificación de la playera debe ser número.",
            type: "/error/modificacionincorrecta.html",
        );
    }

    // Valida el estado de eliminado de la playera
    if (!isset($objeto->PLA_ELIMINADO) || !is_int($objeto->PLA_ELIMINADO)) {
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "El campo eliminado de la playera debe ser entero.",
            type: "/error/eliminadoincorrecto.html",
        );
    }

    // Retorna un array con los datos validados de la playera
    return [
        PLA_ID => $objeto->PLA_ID,
        PLA_NOMBRE => $objeto->PLA_NOMBRE,
        PLA_MODELO => $objeto->PLA_MODELO,
        PLA_TALLA => $objeto->PLA_TALLA,
        PLA_TELA => $objeto->PLA_TELA,
        PLA_COLOR => $objeto->PLA_COLOR,
        PLA_MODIFICACION => $objeto->PLA_MODIFICACION,
        PLA_ELIMINADO => $objeto->PLA_ELIMINADO
    ];
}
