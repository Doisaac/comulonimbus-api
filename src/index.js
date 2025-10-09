import express from "express"
import { PORT } from "./config.js"
import employeesRoutes from "./routes/employees.routes.js"

const app = express()
app.use(express.json())

// Middleware para manejar errores de JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "JSON inválido" })
  }
  next()
})

app.use(employeesRoutes)

app.listen(PORT)
console.log(`Server is running on ${PORT}`)
