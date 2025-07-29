<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php"; // Cambiado de PASATIEMPO a PLAYERA

/**
 * @return false | array{
 * PLA_ID: string,
 * PLA_NOMBRE: string,
 * PLA_MODELO: string,
 * PLA_TALLA: string,
 * PLA_TELA: string,
 * PLA_COLOR: string,
 * PLA_MODIFICACION: int,
 * PLA_ELIMINADO: int
 * }
 */
function playeraBusca(string $id): false|array // Cambiado el nombre de la función
{
    // Busca la primera playera que coincida con el ID proporcionado
    return selectFirst(
        pdo: Bd::pdo(),
        from: PLAYERAS, // Cambiado de PASATIEMPO a PLAYERAS
        where: [PLA_ID => $id] // Cambiado de PAS_ID a PLA_ID
    );
}
