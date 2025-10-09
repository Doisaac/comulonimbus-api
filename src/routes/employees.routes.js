import { Router } from "express"
import {
  createEmpleado,
  deleteEmpleado,
  editEmpleado,
  getEmpleadoById,
  getEmpleados,
} from "../controllers/employees.controller.js"

const router = Router()

// Obtener todos los empleados
router.get("/empleados", getEmpleados)

// Obtener un empleado específico
router.get("/empleados/:id", getEmpleadoById)

// Crear un nuevo empleado
router.post("/empleados", createEmpleado)

// Editar un empleado específico
router.put("/empleados/:id", editEmpleado)

// Eliminar un empleado en específico
router.delete("/empleados/:id", deleteEmpleado)

export default router
