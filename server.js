
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
const allocateWorkRoute = require('./routes/allocateWork');

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mernapp";


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));


// Routes
app.use('/api/workstations', allocateWorkRoute);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}  ${MONGO_URI} `));

/*old code*/
/*
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mernapp";

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins (Fixes mobile issue)
app.use(express.json()); // Parse JSON request body

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model("Task", taskSchema);

// Routes

// 🔹 Get All Tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// 🔹 Create a Task
app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const newTask = new Task({ title });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// 🔹 Update a Task (Mark as Completed)
app.put("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// 🔹 Delete a Task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}  ${MONGO_URI} `));

*/
