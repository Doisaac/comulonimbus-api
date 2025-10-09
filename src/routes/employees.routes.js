import { Router } from "express"
import { pool } from "../db.js"

const router = Router()

// Obtener todos los empleados
router.get("/empleados", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM empleados")
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los empleados" })
  }
})

// Obtener un empleado específico
router.get("/empleados/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { rows } = await pool.query(
      "SELECT * FROM empleados WHERE id_empleado = $1",
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" })
    }

    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el empleado" })
  }
})

// Crear un nuevo empleado
router.post("/empleados", async (req, res) => {
  try {
    const data = req.body

    const {
      nombres,
      apellidos,
      dui,
      contacto,
      direccion,
      puesto,
      departamento: area_departamento,
      fecha_contratacion,
      salario,
      estado,
    } = data

    // Validar que los campos obligatorios principales estén presentes
    if (!nombres || !apellidos || !contacto) {
      return res.status(400).json({
        error:
          "Estructura inválida. Faltan las secciones obligarias: 'nombres', 'apellidos' o 'contacto'.",
      })
    }

    // Extraer subcampos
    const { email, telefono } = contacto || {}
    const {
      pais,
      departamento,
      municipio,
      detalle: detalle_direccion,
    } = direccion || {}
    const { monto: salario_monto, moneda: salario_moneda } = salario || {}

    const camposObligatorios = {
      nombres,
      apellidos,
      dui,
      email,
      telefono,
    }

    // Validar que los campos obligatorios no estén vacíos
    for (const [campo, valor] of Object.entries(camposObligatorios)) {
      if (!valor || valor.trim() === "") {
        return res.status(400).json({
          error: `El campo '${campo}' es obligatorio o está vacío.`,
        })
      }
    }

    // Insertar en la base de datos
    const { rows } = await pool.query(
      `INSERT INTO empleados (
      nombres,
      apellidos,
      dui,
      email,
      telefono,
      pais,
      departamento,
      municipio,
      detalle_direccion,
      puesto,
      area_departamento,
      fecha_contratacion,
      salario_monto,
      salario_moneda,
      estado
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
    ) RETURNING *`,
      [
        nombres,
        apellidos,
        dui,
        email,
        telefono,
        pais,
        departamento,
        municipio,
        detalle_direccion,
        puesto,
        area_departamento,
        fecha_contratacion,
        salario_monto,
        salario_moneda,
        estado,
      ]
    )

    // Éxito
    res.status(201).json({
      mensaje: "Empleado registrado correctamente.",
      empleado: rows[0],
    })
  } catch (error) {
    // Error de formato JSON
    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: "JSON mal formado." })
    }

    // Error de duplicado (PostgreSQL constraint violation)
    if (error.code === "23505") {
      return res.status(409).json({
        error: "El DUI, email o teléfono ya existen en la base de datos.",
      })
    }

    // Cualquier otro error
    res.status(500).json({
      error: "Error interno del servidor.",
      detalle: error.message,
    })
  }
})

// Editar un empleado específico
router.put("/empleados/:id", async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const {
      nombres,
      apellidos,
      dui,
      contacto,
      direccion,
      puesto,
      departamento: area_departamento,
      fecha_contratacion,
      salario,
      estado,
    } = data

    // Validar que los campos obligatorios principales estén presentes
    if (!nombres || !apellidos || !contacto || !dui) {
      return res.status(400).json({
        error:
          "Estructura inválida. Faltan las secciones obligarias: 'nombres', 'apellidos', 'dui' o 'contacto'.",
      })
    }

    // Extraer subcampos
    const { email, telefono } = contacto || {}
    const {
      pais,
      departamento,
      municipio,
      detalle: detalle_direccion,
    } = direccion || {}
    const { monto: salario_monto, moneda: salario_moneda } = salario || {}

    const { rowCount, rows } = await pool.query(
      `UPDATE empleados SET
        nombres = $1,
        apellidos = $2,
        dui = $3,
        email = $4,
        telefono = $5,
        pais = $6,
        departamento = $7,
        municipio = $8,
        detalle_direccion = $9,
        puesto = $10,
        area_departamento = $11,
        fecha_contratacion = $12,
        salario_monto = $13,
        salario_moneda = $14,
        estado = $15
      WHERE id_empleado = $16
      RETURNING *`,
      [
        nombres,
        apellidos,
        dui,
        email,
        telefono,
        pais,
        departamento,
        municipio,
        detalle_direccion,
        puesto,
        area_departamento,
        fecha_contratacion,
        salario_monto,
        salario_moneda,
        estado,
        id,
      ]
    )

    // Id inválido
    if (rowCount === 0) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" })
    }

    return res.json(rows[0])
  } catch (error) {
    // Error de formato JSON
    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: "JSON mal formado." })
    }

    // Error de duplicado (PostgreSQL constraint violation)
    if (error.code === "23505") {
      return res.status(409).json({
        error: "El DUI, email o teléfono ya existen en la base de datos.",
      })
    }

    res.status(500).json({ mensaje: "Error interno del servidor" })
  }
})

// Eliminar un empleado en específico
router.delete("/empleados/:id", async (req, res) => {
  const { id } = req.params
  const { rowCount, rows } = await pool.query(
    "DELETE FROM empleados WHERE id_empleado = $1 RETURNING *",
    [id]
  )

  if (rowCount === 0) {
    return res.status(404).json({ mensaje: "Empleado no encontrado" })
  }

  res.json(rows)
})

export default router
