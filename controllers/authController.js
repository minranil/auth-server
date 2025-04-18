import jwt from "jsonwebtoken";
import authService from "../services/authService.js";
import userService from "../services/userService.js";


class AuthController {
    async signup(req, res, next) {
        try {
            const { email, password, firstName, lastName } = req.body;
            const user = await userService.create({ email, password, firstName, lastName });
            await authService.sendEmailVerification(user.id, user.email);
            return res.status(201).json({ message: "User was created!" });
        } catch (error) {
            return next(error);
        }
    }

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signin({ email, password });

            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }

    async verify(req, res, next) {
        try {
            const { userId } = jwt.verify(req.params.token, process.env.SECRETKEY);
            await userService.findByIdAndUpdate(userId, { isVerified: true });
            return res.status(200).json({ message: "Email verified successfuly." });
        } catch (error) {
            return next(error);
        }
    }
}

export default new AuthController();