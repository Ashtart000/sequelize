const { Router } = require('express');
const UserController = require('../controllers/User.controller');
const pagination = require('../middlewares/pagination.mw');
const { getUserInstance, validateUser } = require('../middlewares/user.mw');
const { getGroupInstance } = require('../middlewares/group.mw');

const userRouter = Router();

userRouter.post('/', validateUser, UserController.createUser);

userRouter.post('/registration', UserController.registration);
userRouter.get('/', pagination, UserController.findAll);
userRouter.get('/:userId', pagination, getUserInstance, UserController.findByPk);
userRouter.delete('/:userId', UserController.deleteOne)
userRouter.put('/:userId', getUserInstance, UserController.updateOne);

module.exports = userRouter;