class NothingFoundError extends Error {
    constructor(message) {
        super(message),
        this.message = 'There are no any tasks here...'
    }
}

module.exports = NothingFoundError;