const { Group, User } = require('../models');

// module.exports.createGroup = async (req, res, next) => {
//     try {
//         const { body } = req;
//         const createdGroup = await Group.create(body);
//         return res.status(201).send(createdGroup);
//     } catch (error) {
//         next(error);
//     }
// }

module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const { userInstance, groupInstance } = req;
        const result = await groupInstance.addUser(userInstance);
        return res.status(200).send('User successfully added to group');
    } catch (error) {
        next(error);
    }
};

module.exports.removeUserFromGroup = async (req, res, next) => {
    try {
        const { userInstance, groupInstance } = req;
        const result = await groupInstance.removeUser(userInstance);
        return res.status(200).send('User successfully deleted from group');
    } catch (error) {
        next(error);
    }
};

module.exports.getUserGroups = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const result = await userInstance.getGroups();
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

// module.exports.getGroupUsers = async (req, res, next) => {
//     try {
//         const {groupInstance} = req;
//         const result = await groupInstance.getUsers({
//             attributes: {
//                 exclude: ['password']
//             }
//         });
//         return res.status(200).send({data: {groupInstance, result}});
//     } catch (error) {
//         next(error);
//     }
// };

module.exports.getGroupUsers = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;

        const groupWithUsers = await Group.findAll({
            where: {
                id: groupId
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                },
                through: {
                    attributes: []
                }
            }] 
        });

        return res.status(200).send(groupWithUsers);
    } catch (error) {
        next(error);
    }
}

module.exports.countUserGroups = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const result = await userInstance.countGroups();
        return res.status(200).send(`${result}`);
    } catch (error) {
        next(error);
    }
};

module.exports.countGroupUsers = async (req, res, next) => {
    try {
        const {groupInstance} = req;
        const result = await groupInstance.countUsers();
        return res.status(200).send(`${result}`);
    } catch (error) {
        next(error);
    }
};

module.exports.setUsersToGroup = async (req, res, next) => {
    try {
        const {groupInstance} = req;
        const result = await groupInstance.setUsers(userArray);
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

const userArray = [
    1, 4, 5, 6
];



module.exports.createGroupImage = async (req, res, next) => {
    try {
        const { params: {groupId}, file: {filename}} = req;
        const [rowCount, [updatedGroup]] = await Group.update({
            imagePath: filename
        }, {
            where: {
                id: groupId
            },
            returning: true
        })
        return res.send(updatedGroup);
    } catch (error) {
        next(error);
    }
}

module.exports.createGroup = async (req, res, next) => {
    try {
        const { body, file: {filename} } = req;
        const createdGroup = await Group.create({...body, imagePath: filename});
        return res.status(201).send(createdGroup);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteGroup = async (req, res, next) => {
    try {
        const { params: {groupId} } = req;
        const deletedGroup = await Group.destroy({
            where: {
                id: groupId
            }
        });
        if(deletedGroup > 0) {
            return res.send('Succesfull delete!'); 
        } else {
            return res.send('Such group does not exist!'); 
        }    
    } catch (error) {
        next (error);
    }
}

module.exports.getAllGroups = async (req, res, next) => {
    try {
        const { pagination } = req;
        const allGroups = await Group.findAll({
            ...pagination
        });
        return res.status(200).send(allGroups);
    } catch (error) {
        next(error);
    }
}