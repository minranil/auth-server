import HttpError, { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from "../common/HttpError.js";


const error = (error, req, res, next) =>  {
    if (error instanceof InternalServerError) {
        console.log(error);
        return next(new InternalServerError(error.message));
    }

    if (error instanceof HttpError) {
        console.log(error);
        return res.status(error.status).json({
            status: error.status,
            name: error.name,
            message: error.message
        });
    }

    if (error instanceof BadRequestError) {
        return next(new BadRequestError(error.message));
    }
    
    if (error instanceof UnauthorizedError) {
        return next(new UnauthorizedError(error.message));
    }
    
    if (error instanceof ForbiddenError) {
        return next(new ForbiddenError(error.message));
    }
    
    if (error instanceof NotFoundError) {
        return next(new NotFoundError(error.message));
    }
};

export default error;