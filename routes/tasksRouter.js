const { Router } = require('express');
const TaskController = require('../controllers/Task.controller');
const pagination = require('../middlewares/pagination.mw');
const { getUserInstance } = require('../middlewares/user.mw');
const { validateTask } = require('../middlewares/task.mw');

const tasksRouter = Router();

tasksRouter.post('/:userId', validateTask, getUserInstance, TaskController.createOneTask);
tasksRouter.get('/', pagination, TaskController.getAllTasks);
tasksRouter.get('/:userId', getUserInstance, pagination, TaskController.getAllUserTasks);
tasksRouter.get('/count/:userId', TaskController.getCountOfTasks);
tasksRouter.get('/:taskId', TaskController.getOneTask);
tasksRouter.delete('/:taskId', TaskController.deleteOneTask);
tasksRouter.put('/:id', TaskController.updateOneTask);

module.exports = tasksRouter;