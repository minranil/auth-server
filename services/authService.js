import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../common/HttpError.js";
import { User } from "../database/index.js";
import sendEmail from "../common/SendEmail.js";


class AuthService {
    async signin ({ email, password }) {
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

    async sendEmailVerification (id, email) {
        const token = jwt.sign({ userId: id }, process.env.SECRETKEY, { expiresIn: "1h" });
        const url = `${process.env.URL}/api/auth/${token}`;
        await sendEmail(
            email, 
            '[auth-server] Please verify your email',
            `<p>Click this link to verify your email:</p>
            <a href="${url}">${url}</a>`
        );
    }
}

export default new AuthService();