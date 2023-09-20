class GroupNotFound extends Error {
    constructor(message) {
        super(message),
        this.message = 'Such group not found'
    }
};

module.exports = GroupNotFound;