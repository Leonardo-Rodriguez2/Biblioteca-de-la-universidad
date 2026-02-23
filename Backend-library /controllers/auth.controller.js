
import jwt from "jsonwebtoken";
import db from "../db/connection.js";
import jwtController from "../helpers/jwt.config.js";

const loginController = {
    login: (req, res) => {
        const { username, password } = req.body;

        const query = "SELECT * FROM usuarios WHERE nombre = ? AND password = ?";

        db.query(query, [username, password], (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error en base de datos", error: err });
            }

            if (data.length === 0) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }

            const user = data[0];

            if (password !== user.password) { 
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            const payload = {
                id: user.id,
                username: user.nombre,
                rol: user.rol_id,
                gmail: user.email
            };


            return res.status(200).json({
                message: "Autenticación exitosa",
                token: jwtController.generateToken({payload}),
                user: payload,
            });
        });
    }
};

export default loginController;