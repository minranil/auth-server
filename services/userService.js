import bcrypt from "bcryptjs";
import { BadRequestError, NotFoundError } from "../common/HttpError.js";
import { User } from "../database/index.js";


class UserService {
    async create({ email, password, firstName, lastName }) {
        const candidate = await User.findOne({
            where: { email: email },
        });
        if (candidate) {
            throw new BadRequestError(`A user with email address ${email} already exists!`);
        }

        const hashPassword = await bcrypt.hash(password, 8);
        const user = await User.build({ email: email, password: hashPassword, firstName: firstName, lastName: lastName });
        await user.save();
    }

    async findByPk(id) {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if(!user) {
            throw new NotFoundError('User not found!');
        }

        return user;
    }

    async update({ email, password, firstName, lastName }) {

    }

    async delete(id) {

    }
}

export default new UserService();