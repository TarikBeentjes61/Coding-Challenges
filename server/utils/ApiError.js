class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = ApiError;