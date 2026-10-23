const express = require('express')
const tasksRouter = require('./routers/tasksRouter')
const { initDb } = require('./config/db')

const app = express()
const PORT = 5000

app.use(express.json())
app.use('/api/tasks', tasksRouter)

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.error("Критическая ошибка БД. Сервер не запущен.", err)
})