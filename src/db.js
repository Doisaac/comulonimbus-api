import pg from "pg"

// Configuración de la conexión a la base de datos
export const pool = new pg.Pool({
  user: "admin",
  host: "localhost",
  password: "admin",
  database: "cumulonimbus-db",
  port: "5432",
})