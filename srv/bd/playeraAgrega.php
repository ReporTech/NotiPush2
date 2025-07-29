<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/insert.php";
require_once __DIR__ . "/Bd.php"; // Se mantiene la referencia a la clase Bd
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php";
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
function playeraAgrega(array $modelo) // Cambiado el nombre de la función
{
    // Validación del ID de la playera
    validaId($modelo[PLA_ID]);
    // Validación del nombre de la playera
    validaNombre($modelo[PLA_NOMBRE]);
    // Validación del modelo de la playera
    validaNombre($modelo[PLA_MODELO]);
    // Validación de la talla de la playera
    validaNombre($modelo[PLA_TALLA]);
    // Validación del tipo de tela de la playera
    validaNombre($modelo[PLA_TELA]);
    // Validación del color de la playera
    validaNombre($modelo[PLA_COLOR]);
    // Inserta los datos de la playera en la tabla PLAYERAS
    insert(pdo: Bd::pdo(), into: PLAYERAS, values: $modelo);
}
