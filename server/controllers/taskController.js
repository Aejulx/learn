const Task = require('../models/Task');



exports.getAllTasksForAdmin = async (req, res) => {
  try {
    const userRole = req.user.role;
    let tasks;
    if (userRole === 'admin') {
      tasks = await Task.find();
    } else {
      const userId = req.user.userId;
      tasks = await Task.find({ createdBy: userId });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};


// get task by id
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ createdBy: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const createdBy = req.user.userId; // Assuming userId is stored in the request
  try {
    const task = new Task({ title, description, createdBy });
    await task.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.userId;
  const { title, description } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    await task.save();
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.userId;

  try {
    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
