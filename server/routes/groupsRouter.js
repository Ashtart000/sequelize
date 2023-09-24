const { Router } = require('express');
const GroupController = require('../controllers/Group.controller');
const { getGroupInstance } = require('../middlewares/group.mw');
const { getUserInstance } = require('../middlewares/user.mw');
const pagination = require('../middlewares/pagination.mw');
const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../config/path.config');

// const upload = multer({dest: path.resolve(__dirname, '../public/images')});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({ storage }) // storage: storage

const groupsRouter = Router();

groupsRouter.get('/', pagination, GroupController.getAllGroups);
groupsRouter.get('/:userId', getUserInstance, GroupController.getUserGroups);
groupsRouter.get('/get-users/:groupId', getGroupInstance, GroupController.getGroupUsers);
groupsRouter.get('/user/:userId', getUserInstance, GroupController.countUserGroups);
groupsRouter.get('/users/:groupId', getGroupInstance, GroupController.countGroupUsers);
groupsRouter.post('/', upload.single('groupAvatar'), GroupController.createGroup);

groupsRouter.put('/:userId/:groupId', getUserInstance, getGroupInstance, GroupController.addUserToGroup);
groupsRouter.delete('/:userId/:groupId', getUserInstance, getGroupInstance, GroupController.removeUserFromGroup);
groupsRouter.delete('/:groupId', GroupController.deleteGroup);

groupsRouter.put('/group-set/:groupId', getGroupInstance, GroupController.setUsersToGroup);

groupsRouter.post('/:groupId', upload.single('groupAvatar'), GroupController.createGroupImage);

module.exports = groupsRouter;