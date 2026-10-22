const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router.get('/', tasksController.getAllTasks)
router.post('/', tasksController.createTask)
router.patch('/', tasksController.updateAllTasks)
router.patch('/:id', tasksController.updateTask)
router.delete('/', tasksController.deleteCompletedTask)
router.delete('/:id', tasksController.deleteTask)

module.exports = router