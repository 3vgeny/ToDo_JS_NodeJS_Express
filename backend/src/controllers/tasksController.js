const tasksModel = require('../models/tasksModel')

const getAllTasks = (req, res) => {
    const tasks = tasksModel.getAllTasks()
    
    res.json(tasks)
}

const createTask = (req, res) => {
    const { text } = req.body;
    const newTask = tasksModel.createTask(text)
    
    res.json(newTask)
}

const updateTask = (req, res) => {
    const idTask = Number(req.params.id)
    const newData = req.body    
    const updatedTask = tasksModel.updateTask(idTask, newData)

    if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask)
}

const updateAllTasks = (req, res) => {
    const { isCompleted } = req.body
    const updatedTasks = tasksModel.updateAllTasks(isCompleted)

    res.json({ message: 'All tasks updated', tasks: updatedTasks })
}

const deleteTask = (req, res) => {
    const idTask = Number(req.params.id)
    const isDeletedTask = tasksModel.deleteTask(idTask)
    
    if (!isDeletedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: `Task with id ${idTask} deleted successfully` });
}

const deleteCompletedTask = (req, res) => {
    const remainingTasks = tasksModel.deleteCompletedTask()

    res.json({
        message: 'Completed tasks deleted successfully',
        tasks: remainingTasks 
    })
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    updateAllTasks,
    deleteTask,
    deleteCompletedTask
}