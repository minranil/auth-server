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

        return user;
    }

    async findByIdAndUpdate (id, updatedData) {
        const user = await User.findByPk(id);
        if(!user) {
            throw new NotFoundError('User not found!');
        }

        await user.update(updatedData);
        await user.save();

        return user;
    }
}

export default new UserService();