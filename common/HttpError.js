export default class HttpError extends Error {
    constructor(status, name, message) {
        super(message);
        this.status = status;
        this.name = name;
    }
}

export class BadRequestError extends HttpError {
    constructor(message) {
        super(400, 'Bad Request', message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message) {
        super(401, 'Unauthorized',message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message) {
        super(403, 'Forbidden', message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message) {
        super(404, 'Not Found', message);
    }
}

export class TooManyRequestsError extends HttpError {
    constructor(message) {
        super(429, 'Too Many Requests', message);
    }
}

export class InternalServerError extends HttpError {
    constructor(message) {
        super(500, 'Internal Server Error', message);
    }
}