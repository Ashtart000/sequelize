const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');

const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findByPk);
router.delete('/user/:id', UserController.deleteOne)
router.put('/user/:id', UserController.updateOne);

router.post('/task', TaskController.createOneTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/task/:id', TaskController.getOneTask);
router.delete('/task/:id', TaskController.deleteOneTask);
router.put('/task/:id', TaskController.updateOneTask);

module.exports = router;