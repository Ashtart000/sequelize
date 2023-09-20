const GroupNotFound = require('../errors/GroupNotFound');
const { Group } = require('../models');

module.exports.getGroupInstance = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        const group = await Group.findByPk(groupId);
        if(group) {
            req.groupInstance = group;
        } else {
            throw new GroupNotFound;
        }
        next();
    } catch (error) {
        next(error);
    }
};