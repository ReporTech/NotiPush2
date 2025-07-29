<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/update.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php"; // Cambiado de PASATIEMPO a PLAYERA
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 * PLA_ID: string,
 * PLA_NOMBRE: string,
 * PLA_MODELO: string,
 * PLA_TALLA: string,
 * PLA_TELA: string,
 * PLA_COLOR: string,
 * PLA_MODIFICACION: int,
 * PLA_ELIMINADO: int
 * } $modelo
 */
function playeraModifica(array $modelo) // Cambiado el nombre de la función
{
    // Valida que el ID de la playera sea válido
    validaId($modelo[PLA_ID]);
    // Valida el nombre de la playera
    validaNombre($modelo[PLA_NOMBRE]);
    // Valida el modelo de la playera
    validaNombre($modelo[PLA_MODELO]);
    // Valida la talla de la playera
    validaNombre($modelo[PLA_TALLA]);
    // Valida el tipo de tela de la playera
    validaNombre($modelo[PLA_TELA]);
    // Valida el color de la playera
    validaNombre($modelo[PLA_COLOR]);
    // Actualiza los datos de la playera en la tabla PLAYERAS
    update(
        pdo: Bd::pdo(),
        table: PLAYERAS, // Cambiado de PASATIEMPO a PLAYERAS
        set: $modelo,
        where: [PLA_ID => $modelo[PLA_ID]] // Cambiado de PAS_ID a PLA_ID
    );
}
