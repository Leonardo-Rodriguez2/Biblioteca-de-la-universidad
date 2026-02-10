0
import db from "../db/connection.js"
import fs from 'fs';
import path from 'path';

const DocumentController = {

    getDocuments: async (req, res) => {
        try {
            const query = "SELECT * FROM documentos";
            const [rows] = await db.query(query, (err, results)=> {
                if (err) {
                    console.log({ err: err.message });
                    res.status(500).json({ message: "Error en el servidor", err: true });
                }
                res.status(200).json({ message: "Documentos obtenidos", data: results });
            });    
        } catch (err) {
            console.log({ err: err.message });
            res.status(500).json({ message: "Error en el servidor", err: true });
        }
    },

    getContentDocument: async (req, res) => {
        try {
            const { id } = req.params;
            const query = "SELECT * FROM documentos WHERE id = ?";
            const [rows] = await db.query(query, [id], (err, results) => {
                if (err) {
                    console.log({ err: err.message });
                    res.status(500).json({ message: "Error en el servidor", err: true });
                }
                res.status(2000).json({ message: fs.readFileSync(path.join(process.cwd(), 'uploads', results[0].ruta), 'utf-8') });
            });
        } catch (err) {
            console.log({ err: err.message });
            res.status(500).json({ message: "Error en el servidor", err: true });
        }
    }
}

