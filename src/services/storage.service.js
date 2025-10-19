import { Storage } from "@google-cloud/storage"

// Configuración del cliente de Google Cloud Storage
const storage = new Storage({
  projectId: "proyectofinal-cpn",
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

// Nombre del bucket
const BUCKET_NAME = "cumulonimbus-bucket-001"
const bucket = storage.bucket(BUCKET_NAME)

// Sube o actualiza un archivo JSON en el bucket
export const subirEmpleadoJSON = async (empleado) => {
  try {
    const fileName = `empleados/${empleado.id_empleado}.json`
    const file = bucket.file(fileName)

    const jsonBuffer = Buffer.from(JSON.stringify(empleado, null, 2))

    // Subir (si ya existe, lo sobrescribe automáticamente)
    await file.save(jsonBuffer, {
      contentType: "application/json",
      resumable: false,
      validation: "crc32c",
      metadata: {
        cacheControl: "no-cache, no-store, must-revalidate",
      },
    })

    // Hacer público el archivo
    await file.makePublic()

    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`

    return publicUrl
  } catch (error) {
    console.error("Error al subir el archivo a GCS:", error.message)
    throw new Error("Error al transferir el archivo al bucket")
  }
}

/**
 * Elimina el archivo JSON del bucket si existe el empleado
 */
export const eliminarEmpleadoJSON = async (id_empleado) => {
  try {
    const fileName = `empleados/${id_empleado}.json`
    const file = bucket.file(fileName)
    await file.delete({ ignoreNotFound: true })
    console.log(`Archivo ${fileName} eliminado del bucket.`)
  } catch (error) {
    console.error("Error al eliminar del bucket:", error.message)
  }
}
