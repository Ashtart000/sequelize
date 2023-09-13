class NotFoundError extends Error {
    constructor(message) {
        super(message),
        this.message = 'Sorry. Such task does not exist.'
    }
}

module.exports = NotFoundError;