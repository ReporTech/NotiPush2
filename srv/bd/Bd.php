<?php

class Bd
{
    private static ?PDO $pdo = null;

    static function pdo(): PDO
    {
        if (self::$pdo === null) {
            // Obtén las credenciales de las variables de entorno
            $dbHost = getenv('DB_HOST');
            $dbName = getenv('DB_NAME');
            $dbUser = getenv('DB_USER');
            $dbPass = getenv('DB_PASS');
            $dbPort = getenv('DB_PORT') ?: '5432'; // Puerto por defecto para PostgreSQL

            // Cadena de conexión para PostgreSQL
            $dsn = "pgsql:host=$dbHost;port=$dbPort;dbname=$dbName";

            self::$pdo = new PDO(
                $dsn,
                $dbUser,
                $dbPass,
                [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );

            // **IMPORTANTE:** Asegúrate de que el SQL para crear la tabla sea compatible con PostgreSQL.
            // Las restricciones CHECK de longitud (LENGTH) no son comunes en PostgreSQL y pueden eliminarse.
            self::$pdo->exec(
                'CREATE TABLE IF NOT EXISTS PLAYERAS (
                    PLA_ID TEXT NOT NULL,
                    PLA_NOMBRE TEXT NOT NULL,
                    PLA_MODELO TEXT NOT NULL,
                    PLA_TALLA TEXT NOT NULL,
                    PLA_TELA TEXT NOT NULL,
                    PLA_COLOR TEXT NOT NULL,
                    PLA_MODIFICACION INTEGER NOT NULL,
                    PLA_ELIMINADO INTEGER NOT NULL,
                    CONSTRAINT PLA_PK
                        PRIMARY KEY(PLA_ID)
                    /* Las siguientes restricciones CHECK son más específicas de SQLite
                     * y podrían no ser necesarias o requerir un ajuste de sintaxis
                     * para PostgreSQL. Puedes probar a eliminarlas si dan error. */
                    // CONSTRAINT PLA_ID_NV CHECK(LENGTH(PLA_ID) > 0),
                    // CONSTRAINT PLA_NOM_NV CHECK(LENGTH(PLA_NOMBRE) > 0),
                    // CONSTRAINT PLA_MODELO_NV CHECK(LENGTH(PLA_MODELO) > 0),
                    // CONSTRAINT PLA_TALLA_NV CHECK(LENGTH(PLA_TALLA) > 0),
                    // CONSTRAINT PLA_TELA_NV CHECK(LENGTH(PLA_TELA) > 0),
                    // CONSTRAINT PLA_COLOR_NV CHECK(LENGTH(PLA_COLOR) > 0)
                )'
            );
        }
        return self::$pdo;
    }
}
