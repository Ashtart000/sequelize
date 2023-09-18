const { Router } = require('express');
const GroupController = require('../controllers/Group.controller');
const { getGroupInstance } = require('../middlewares/group.mw');
const { getUserInstance } = require('../middlewares/user.mw');

const groupsRouter = Router();

groupsRouter.get('/:userId', getUserInstance, GroupController.getUserGroups);
groupsRouter.get('/get-users/:groupId', getGroupInstance, GroupController.getGroupUsers);
groupsRouter.get('/user/:userId', getUserInstance, GroupController.countUserGroups);
groupsRouter.get('/users/:groupId', getGroupInstance, GroupController.countGroupUsers);
groupsRouter.post('/', GroupController.createGroup);
groupsRouter.put('/:userId/:groupId', getUserInstance, getGroupInstance, GroupController.addUserToGroup);
groupsRouter.delete('/:userId/:groupId', getUserInstance, getGroupInstance, GroupController.removeUserFromGroup);

groupsRouter.put('/group-set/:groupId', getGroupInstance, GroupController.setUsersToGroup);

module.exports = groupsRouter;