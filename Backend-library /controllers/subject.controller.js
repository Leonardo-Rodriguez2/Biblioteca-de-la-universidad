
import db from '../db/connection.js';

const subjectController = {
    getAllSubjects: (req, res) => {
        const query = 'SELECT * FROM asignaturas';
        db.query(query, (err, data) => {
            if(err) {
                console.log("error en la consulta", err);
                res.status(500).json({ message: "Error en el servidor al obtener las asignaturas", err: true });
            }
            console.log("consulta exitosa", data);
            res.status(200).json({ message: "Asignaturas obtenidas exitosamente", data: data, err: false });
        })
    }
}


export default subjectController;
