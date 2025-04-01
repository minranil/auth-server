import authService from "../services/authService.js";
import userService from "../services/userService.js";


class AuthController  {
    async signup(req, res, next) {
        try {
            const { email, password, firstName, lastName } = req.body;
            await userService.create({ email, password, firstName, lastName });

            return res.status(201).json({ message: "User was created!" });
        } catch(error) {
            return next(error);
        }
    }

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signin({ email, password });
            
            return res.status(200).json(user);
        } catch(error) {
            return next(error);
        }
    }
}

export default new AuthController();