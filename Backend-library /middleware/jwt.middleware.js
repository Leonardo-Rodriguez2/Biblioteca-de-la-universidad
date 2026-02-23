import jwt from "jsonwebtoken";
import { JWT_KEY } from "../shaders/jwt.key.js";

const jwtMiddleware = {
    verifyJwt: (req, res, next) => {
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
        }

        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7, authHeader.length) 
            : authHeader;

        try {

            const decoded = jwt.verify(token, JWT_KEY);

            req.user = decoded;
            
            next();
        } catch (err) {
            console.error("Error de validación JWT:", err.message);
            return res.status(403).json({ 
                message: "Token inválido o expirado", 
                error: err.message 
            });
        }
    }
};

export default jwtMiddleware;