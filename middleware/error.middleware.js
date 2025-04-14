import HttpError from "../common/HttpError.js";


const error = (error, req, res, next) =>  {

    if (error instanceof HttpError) {
        console.log(error);    
        return res.status(error.status).json({
            status: error.status,
            name: error.name,
            message: error.message
        });
    } 
    
};

export default error;