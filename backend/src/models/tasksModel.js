let tasks = []
let nextId = 0

const getAllTasks = () => {
    return tasks
}

const createTask = (text) => {
    const newTask = {
        id: nextId++,
        text: text,
        isCompleted: false
    }

    tasks.push(newTask)

    return newTask
}

const updateTask = (id, newData) => {
    const task = tasks.find(task => task.id === id)

    if (!task) return null
    if (newData.text !== undefined) task.text = newData.text
    if (newData.isCompleted !== undefined) task.isCompleted = newData.isCompleted

    return task
}

const updateAllTasks = (newStatusTasks) => {
    tasks.forEach(task => task.isCompleted = newStatusTasks)

    return tasks
}

const deleteTask = (idTask) => {
    tasks = tasks.filter(task => task.id !== idTask)

    return true
}

const deleteCompletedTask = () => {
    tasks = tasks.filter(task => !task.isCompleted)

    return tasks
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    updateAllTasks,
    deleteTask,
    deleteCompletedTask
}

