const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');
const { getUserInstance, validateUser } = require('../middlewares/user.mw');
const { validateTask } = require('../middlewares/task.mw');

const router = Router();

router.post('/user', validateUser, UserController.createUser);
router.get('/users', UserController.findAll);
router.get('/user/:userId', getUserInstance, UserController.findByPk);
router.delete('/user/:userId', UserController.deleteOne)
router.put('/user/:userId', getUserInstance, UserController.updateOne);

router.post('/task/:userId', validateTask, getUserInstance, TaskController.createOneTask);
router.get('/tasks/:userId', getUserInstance, TaskController.getAllTasks);
router.get('/tasks-count/:userId', TaskController.getCountOfTasks);
router.get('/task/:id', TaskController.getOneTask);
router.delete('/task/:id', TaskController.deleteOneTask);
router.put('/task/:id', TaskController.updateOneTask);

module.exports = router;