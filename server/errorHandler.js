const NotCreatedError = require('./errors/NotCreatedError');
const NotFoundError = require('./errors/NotFoundError');
const NothingFoundError = require('./errors/NothingFoundError');
const { ValidationError } = require('yup');
const UserNotFoundError = require('./errors/UserNotFoundError');
const GroupNotFound = require('./errors/GroupNotFound');


module.exports.basicErrorHandler = (err, req, res, next) => {
    if(err instanceof NotFoundError) {
        return res.status(404).send(err.message);
    }
    if(err instanceof NotCreatedError) {
        return res.status(204).send(err.message);
    }
    if(err instanceof NothingFoundError) {
        return res.status(404).send(err.message);
    }
    if(err instanceof ValidationError) {
        return res.status(400).send(err.message);
    }
    if(err instanceof UserNotFoundError) {
        return res.status(404).send(err.message);
    }
    if(err instanceof GroupNotFound) {
        return res.status(404).send(err.message);
    }
    else {
        return res.status(500).send('Something wrong');
    }
}