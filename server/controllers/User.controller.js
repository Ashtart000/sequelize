const { User } = require('./../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserNotFoundError = require('../errors/UserNotFoundError');

const createToken = (id, email, userRole) => {
    return jwt.sign(
        {id, email, userRole}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await User.create(body);
        return res.status(201).send(createdUser);
    } catch (error) {
        next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const { pagination } = req;
        const allUsers = await User.findAll({
            ...pagination,
            attributes: {
                exclude: ['password']
            }
        });
        return res.status(200).send(allUsers);
    } catch (error) {
        next(error);
    }
};

module.exports.findByPk = async (req, res, next) => {
    try {
        const { userInstance } = req;
        return res.status(200).send(userInstance);
    } catch (error) {
        next(error);
    }
};

module.exports.deleteOne = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const deletedUser = await User.destroy({
            where: {
                id: userId
            }
        });
        if(deletedUser > 0) {
            return res.status(200).send('Succesfull delete!');
        } else {
            return res.status(204).send('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// module.exports.updateOne = async (req, res, next) => {
//     try {
//         const {body, params: {id}} = req;
//         const result = await User.update(body, {
//             where: {
//                 id
//             }
//         });
//         return res.status(200).send('User updated');
//     } catch (error) {
//         next(error);
//     }
// };

module.exports.updateOne = async (req, res, next) => {
    try {
        const {body, userInstance} = req;
        const result = await userInstance.update(body);
        return res.status(200).send('User updated');
    } catch (error) {
        next(error);
    }
};

module.exports.registration = async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);
        const hashPassword = await bcrypt.hash(body.password, 5);
        const user = await User.create({ ...body, password: hashPassword });

        const token = createToken(user.id, user.email, user.userRole);
        return res.json({token});
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new UserNotFoundError();
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw new Error ('Указан неверный пароль')
        }
        const token = createToken(user.id, user.email, user.role);
        return res.json({token});
    } catch (error) {
        next(error);
    }
}

module.exports.check = (req, res, next) => {
    res.json('Все работает')
    const { user } = req;
    const token = createToken(user.id, user.email, user.role);
    return res.json({token});
}

