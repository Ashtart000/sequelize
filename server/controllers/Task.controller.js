const { Task, User } = require('../models');
const NotFoundError = require('../errors/NotFoundError');
const NotCreatedError = require('../errors/NotCreatedError');
const NothingFoundError = require('../errors/NothingFoundError');

// module.exports.createOneTask = async (req, res, next) => {
//     try {
//         const { body } = req;
//         const createdTask = await Task.create(body);
//         if(createdTask) {
//             return res.status(201).send(createdTask);
//         } else {
//             throw new NotCreatedError();
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports.createOneTask = async (req, res, next) => {  // not magic
//     try {
//         const {body, params: {userId}} = req;
//         const createdTask = await Task.create({...body, userId});
//         return res.status(201).send(createdTask);
//     } catch (error) {
//         next(error);
//     }
// };

module.exports.createOneTask = async (req, res, next) => {
    try {
        const {body, userInstance} = req;
        const result = await userInstance.createTask(body);
        return res.status(201).send(result);
    } catch (error) {
        next(error);
    }
};

module.exports.getOneTask = async (req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const gettedTask = await Task.findByPk(taskId);
        if(gettedTask) {
            return res.status(200).send(gettedTask);
        } else {
            throw new NotFoundError();
        }
    } catch (error) {
        next(error);
    }
};

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const { pagination } = req;
        const allTasks = await Task.findAll({
            ...pagination
        });
        if(allTasks.length > 0) {
            return res.status(200).send(allTasks);
        } else {
            throw new NothingFoundError();
        }
    } catch (error) {
        next(error);
    }
};

module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const {userInstance, pagination} = req;
        const result = await userInstance.getTasks({
            ...pagination
        });
        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

// module.exports.getCountOfTasks = async (req, res, next) => {
//     try {
//         const {params: {userId}} = req;
//         const user = await User.findByPk(userId);
//         const result = await user.countTasks();
//         return res.status(200).send(`${result}`);
//     } catch (error) {
//         next(error);
//     }
// };

module.exports.getCountOfTasks = async (req, res, next) => {    // not magic method
    try {
        const {params: {userId}} = req;
        const result = await Task.count({
            where: {
                userId
            }
        });
        return res.status(200).send(`${result}`);
    } catch (error) {
        next(error);
    }
};

module.exports.updateOneTask = async (req, res, next) => {
    try {
        const {body, params: {taskId}} = req;
        console.log(req);
        const updatedTask = await Task.update(body, {
            where: {
                id: taskId
            }
        });
        if (updatedTask > 0) {
            return res.status(200).send('Successfully updated!');
        } else {
            throw new NotFoundError();
        }
    } catch (error) {
        next(error);
    }
};

module.exports.deleteOneTask = async (req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const deletedTask = await Task.destroy({
            where: {
                id: taskId
            }
        });
        if (deletedTask > 0) {
            return res.status(200).send('Successfully deleted!');
        } else {
            throw new NotFoundError();
        }   
    } catch (error) {
        next(error);
    }
};