const { Router } = require('express');

const userRouter = require('./usersRouter');
const tasksRouter = require('./tasksRouter');
const groupsRouter = require('./groupsRouter');

const router = Router();
router.use('/users', userRouter);
router.use('/tasks', tasksRouter);
router.use('/groups', groupsRouter);

module.exports = router;