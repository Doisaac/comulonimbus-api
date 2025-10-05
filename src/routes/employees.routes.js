import { Router } from 'express'

const router = Router()

// Obtener todos los empleados
router.get('/empleados', (req, res) => {
  res.send('Obteniedo empleados')
})

// Obtener un empleado específico
router.get('/empleados/:id', (req, res) => {
  const { id } = req.params
  res.send(`Obteniendo empleado con ID: ${id}`)
})

// Crear un nuevo empleado
router.post('/empleados', (req, res) => {
  res.send('Creando un nuevo empleado')
})

// Editar un empleado específico
router.put('/empleados/:id', (req, res) => {
  res.send('Editando un empleado')
})

// Eliminar un empleado en específico
router.delete('/empleados/:id', (req, res) => {
  const { id } = req.params
  res.send(`Eliminando empleado con ID: ${id}`)
})

export default router