const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.verifyToken, taskController.getAllTasks);
router.post('/', authMiddleware.verifyToken, taskController.createTask);
router.put('/:id', authMiddleware.verifyToken, taskController.updateTask);
router.put('/:id', authMiddleware.verifyToken, taskController.deleteTask);
router.get('/admin/tasks', authMiddleware.verifyToken, authMiddleware.isAdmin, taskController.getAllTasksForAdmin);

module.exports = router;


