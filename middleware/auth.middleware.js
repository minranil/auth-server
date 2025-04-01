import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../common/HttpError.js";


const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            throw new UnauthorizedError('Unauthorized Error!')
        }
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        req.user = decoded
        return next()
    } catch(error) {
        return next(error)
    }
}

export default auth;