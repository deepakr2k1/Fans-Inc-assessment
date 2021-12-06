const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: String,
    is_completed: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Tasks', taskSchema);