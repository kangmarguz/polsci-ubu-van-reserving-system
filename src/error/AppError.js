export class AppError extends Error {
    constructor(message, statusCode, originalError = null) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.originalError = originalError;
    }

    get isClientError() {
        return this.statusCode >= 400 && this.statusCode < 500;
    }

    get isServerError() {
        return this.statusCode >= 500;
    }

    get isUnauthorized() {
        return this.statusCode === 401;
    }
    get isForbidden() {
        return this.statusCode === 403;
    }
    get isNotFound() {
        return this.statusCode === 404;
    }
}
