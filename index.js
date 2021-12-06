const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to Mongo DB");
})

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/v1/tasks', require('./routes/tasksRoutes'));

// start server
app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})