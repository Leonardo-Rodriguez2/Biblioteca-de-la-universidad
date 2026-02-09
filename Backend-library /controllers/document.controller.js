0
import db from "../db/connection.js"

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
    }
}

