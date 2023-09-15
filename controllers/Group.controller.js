const { Group } = require('../models');

module.exports.createGroup = async (req, res, next) => {
    try {
        const { body } = req;
        const createdGroup = await Group.create(body);
        return res.status(201).send(createdGroup);
    } catch (error) {
        next(error);
    }
}

module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const { userInstance, params: { groupId } } = req;
        const groupInstance = await Group.findByPk(groupId);
        const result = await groupInstance.addUser(userInstance);
        return res.status(200).send('User successfully added to group');
    } catch (error) {
        next(error);
    }
};

module.exports.removeUserFromGroup = async (req, res, next) => {
    try {
        const { userInstance, params: { groupId } } = req;
        const groupInstance = await Group.findByPk(groupId);
        const result = await groupInstance.removeUser(userInstance);
        return res.status(200).send('User successfully deleted from group');
    } catch (error) {
        next(error);
    }
};

module.exports.getUsersGroups = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const result = await userInstance.getGroups();
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

module.exports.getGroupUsers = async (req, res, next) => {
    try {
        const {groupInstance} = req;
        const result = await groupInstance.getUsers();
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};
