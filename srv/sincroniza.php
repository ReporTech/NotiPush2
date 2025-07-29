<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_PLAYERA.php"; // Cambiado de TABLA_PASATIEMPO a TABLA_PLAYERA
require_once __DIR__ . "/modelo/validaPlayera.php"; // Cambiado de validaPasatiempo a validaPlayera
require_once __DIR__ . "/bd/playeraAgrega.php"; // Cambiado de pasatiempoAgrega a playeraAgrega
require_once __DIR__ . "/bd/playeraBusca.php"; // Cambiado de pasatiempoBusca a playeraBusca
require_once __DIR__ . "/bd/playeraConsultaNoEliminados.php"; // Cambiado de pasatiempoConsultaNoEliminados a playeraConsultaNoEliminadas
require_once __DIR__ . "/bd/playeraModifica.php"; // Cambiado de pasatiempoModifica a playeraModifica

ejecutaServicio(function () {

    $lista = recuperaJson();

    if (!is_array($lista)) {
        $lista = [];
    }

    foreach ($lista as $modelo) {
        $modeloEnElCliente = validaPlayera($modelo); // Cambiado validaPasatiempo a validaPlayera
        $modeloEnElServidor = playeraBusca($modeloEnElCliente[PLA_ID]); // Cambiado pasatiempoBusca a playeraBusca y PAS_ID a PLA_ID

        if ($modeloEnElServidor === false) {

            /* CONFLICTO: El modelo de playera no ha estado en el servidor.
             * AGREGARLO solamente si no está eliminado. */
            if ($modeloEnElCliente[PLA_ELIMINADO] === 0) { // Cambiado PAS_ELIMINADO a PLA_ELIMINADO
                playeraAgrega($modeloEnElCliente); // Cambiado pasatiempoAgrega a playeraAgrega
            }
        } elseif (
            $modeloEnElServidor[PLA_ELIMINADO] === 0 // Cambiado PAS_ELIMINADO a PLA_ELIMINADO
            && $modeloEnElCliente[PLA_ELIMINADO] === 1 // Cambiado PAS_ELIMINADO a PLA_ELIMINADO
        ) {

            /* CONFLICTO: El registro de la playera está en el servidor, donde no se ha eliminado, pero
             * ha sido eliminado en el cliente.
             * Gana el cliente, porque optamos por no revivir lo eliminado. */
            playeraModifica($modeloEnElCliente); // Cambiado pasatiempoModifica a playeraModifica
        } else if (
            $modeloEnElCliente[PLA_ELIMINADO] === 0 // Cambiado PAS_ELIMINADO a PLA_ELIMINADO
            && $modeloEnElServidor[PLA_ELIMINADO] === 0 // Cambiado PAS_ELIMINADO a PLA_ELIMINADO
        ) {

            /* CONFLICTO: Registros de playeras en el servidor y en el cliente. Pueden ser
             * diferentes.
             * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
            if (
                $modeloEnElCliente[PLA_MODIFICACION] > // Cambiado PAS_MODIFICACION a PLA_MODIFICACION
                $modeloEnElServidor[PLA_MODIFICACION] // Cambiado PAS_MODIFICACION a PLA_MODIFICACION
            ) {
                // La versión del cliente es más nueva y prevalece.
                playeraModifica($modeloEnElCliente); // Cambiado pasatiempoModifica a playeraModifica
            }
        }
    }

    $lista = playeraConsultaNoEliminadas(); // Cambiado pasatiempoConsultaNoEliminados a playeraConsultaNoEliminadas

    devuelveJson($lista);
});
