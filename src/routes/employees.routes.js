import { Router } from 'express'

const router = Router()

// Obtener todos los empleados
router.get('/employees', (req, res) => {
  res.send('Obteniedo empleados')
})

// Obtener un empleado específico
router.get('/employees/:id', (req, res) => {
  const { id } = req.params
  res.send(`Obteniendo empleado con ID: ${id}`)
})

// Crear un nuevo empleado
router.post('/employees', (req, res) => {
  res.send('Creando un nuevo empleado')
})

// Editar un empleado específico
router.put('/employees/:id', (req, res) => {
  res.send('Editando un empleado')
})

// Eliminar un empleado en específico
router.delete('/employees/:id', (req, res) => {
  const { id } = req.params
  res.send(`Eliminando empleado con ID: ${id}`)
})

export default router