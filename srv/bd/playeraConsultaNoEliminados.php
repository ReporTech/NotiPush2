<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php"; // Cambiado de PASATIEMPO a PLAYERA

/**
 * @return array{
 * PLA_ID: string,
 * PLA_NOMBRE: string,
 * PLA_MODELO: string,
 * PLA_TALLA: string,
 * PLA_TELA: string,
 * PLA_COLOR: string,
 * PLA_MODIFICACION: int,
 * PLA_ELIMINADO: int
 * }[]
 */
function playeraConsultaNoEliminadas() // Cambiado el nombre de la función
{
    // Consulta todas las playeras que no han sido eliminadas, ordenadas por nombre
    return select(
        pdo: Bd::pdo(),
        from: PLAYERAS, // Cambiado de PASATIEMPO a PLAYERAS
        where: [PLA_ELIMINADO => 0], // Cambiado de PAS_ELIMINADO a PLA_ELIMINADO
        orderBy: PLA_NOMBRE // Cambiado de PAS_NOMBRE a PLA_NOMBRE
    );
}
