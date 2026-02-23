
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../shaders/jwt.key.js";

const jwtController = {

    generateToken: (payload) => {
        return jwt.sign(payload, JWT_KEY, { expiresIn: '6h' });
    },

}

export default jwtController;