import express from "express"
import { PORT } from "./config.js"
import employeesRoutes from "./routes/employees.routes.js"

const app = express()
app.use(employeesRoutes)

app.listen(PORT)
console.log(`Server is running on ${PORT}`)