const NotCreatedError = require("./errors/NotCreatedError");
const NotFoundError = require("./errors/NotFoundError");
const NothingFoundError = require("./errors/NothingFoundError");


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
    else {
        return res.status(500);
    }
}