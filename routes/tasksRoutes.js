var express = require('express');
var router = express.Router();
const tasksController = require('../controllers/tasksController');

// Create a new Task & bulk tasks
router.post('/', tasksController.createTasks);

// List all tasks created
router.get('/', tasksController.getAlltasks);

// Get a specific task
router.get('/:id', tasksController.getTaskById);

// Delete a specific task
router.delete('/:id', tasksController.delTaskById);

// Edit the title or completion of a specific task
router.put('/:id', tasksController.updateTaskById);

// Delete a specific task
router.delete('/', tasksController.delBulkTasks);

module.exports = router;