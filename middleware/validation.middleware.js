import { BadRequestError } from "../common/HttpError.js";
import { validateEmail, validateName, validatePassword } from "../common/validation.js";


export function validateSignupUserData(req, res, next) {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!validateEmail(email)) {
            throw new BadRequestError('The email address specified is not valid!');
        }

        if (!validatePassword(password, 8)) {
            throw new BadRequestError('The password specified is not valid!');
        }

        if (!validateName(firstName, 2)) {
            throw new BadRequestError('The first name specified is not valid!');
        }

        if (!validateName(lastName, 2)) {
            throw new BadRequestError('The last name specified is not valid!');
        }

        return next()
    } catch (error) {
        return next(error)
    }
}