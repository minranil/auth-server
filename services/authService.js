import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../common/HttpError.js";
import { User } from "../database/index.js";


class AuthService {
    async signin({ email, password }) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new NotFoundError(`User with email address ${email} not found!`);
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            throw new BadRequestError(`Incorrect password!`);
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, { expiresIn: "8h" });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }
}

export default new AuthService();