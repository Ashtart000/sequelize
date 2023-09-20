class NotCreatedError extends Error {
    constructor(message) {
        super(message),
        this.message = 'Not created. Something wrong with this task.'
    }
}

module.exports = NotCreatedError;