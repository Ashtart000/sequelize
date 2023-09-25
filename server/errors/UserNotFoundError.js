class UserNotFoundError extends Error {
    constructor(message) {
        super(message);

        this.message = JSON.stringify({ error: "Such user not found" });;
    }
};

module.exports = UserNotFoundError;