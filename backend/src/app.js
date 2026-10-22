const express = require('express')
const tasksRouter = require('./routers/tasksRouter')

const app = express()
const PORT = 5000

app.use(express.json())
app.use('/api/tasks', tasksRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})