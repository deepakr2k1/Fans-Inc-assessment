const Task = require('../models/taskModel');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { mongoId, arrMongoId } = require('../utils/validateId');

// Create a new Task & bulk tasks
const createTasks = async (req, res) => {
    try {
        var payload = req.body;
        if (payload && !payload.tasks) {
            var taskToCreate = _.pick(payload, ['title']);
            var createdTask = await Task.create(taskToCreate)
            res.status(201).json({ "id": createdTask.id });
        } else if (payload && payload.tasks) {
            var bulkTasks = _.map(payload.tasks, _.partialRight(_.pick, ['title', 'is_completed']));
            var createdTask = await Task.insertMany(bulkTasks)
            var createdTaskIds = _.map(createdTask, _.partialRight(_.pick, ['id']));
            res.status(201).json({ "tasks": createdTaskIds });
        }
    } catch (e) {
        res.status(500).end();
    }
}

// List all tasks created
const getAlltasks = async (req, res) => {
    try {
        var allTasks = await Task.find();
        res.status(200).json({ "tasks": allTasks });
    } catch (e) {
        res.status(500).end();
    }
}

// Get a specific task
const getTaskById = async (req, res) => {
    try {
        var taskId = mongoId(req.params.id);
        var task = taskId && await Task.findOne({ _id: taskId });
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({
                "error": "There is no task at that id"
            })
        }
    } catch (e) {
        res.status(500).end();
    }
}

// Delete a specific task
const delTaskById = async (req, res) => {
    try {
        var taskId = mongoId(req.params.id);
        var task = taskId && await Task.deleteOne({ _id: taskId });
        if (task.deletedCount) {
            res.status(204).end();
        } else {
            res.status(404).json({
                "error": "There is no task at that id"
            })
        }
    } catch (e) {
        res.status(500).end();
    }
}

// Edit the title or completion of a specific task
const updateTaskById = async (req, res) => {
    try {
        var taskId = mongoId(req.params.id);
        var taskToUpdate = _.pick(req.body, ['title', 'is_completed']);
        var updatedTask = taskId && await Task.updateOne({ _id: taskId }, taskToUpdate);
        if (updatedTask.matchedCount) {
            res.status(204).end();
        } else {
            res.status(404).json({
                "error": "There is no task at that id"
            })
        }
    } catch (e) {
        res.status(500).end();
    }
}

// Delete a specific task
const delBulkTasks = async (req, res) => {
    try {
        var payload = req.body;
        var bulkTasks = arrMongoId(payload.tasks);
        await Task.deleteMany({ _id: { $in: bulkTasks } });
        res.status(204).end();
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
}

module.exports = {
    createTasks,
    getAlltasks,
    getTaskById,
    delTaskById,
    updateTaskById,
    delBulkTasks
}