class UserNotFound extends Error {
    constructor(message) {
        super(message),
        this.message = 'Such user not found'
    }
};

module.exports = UserNotFound;