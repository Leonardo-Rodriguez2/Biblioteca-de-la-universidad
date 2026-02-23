
import db from '../db/connection.js';

const subjectController = {

    // Metodo para mostrar todas las asignaturas

    getAllSubjects: (req, res) => {
        const query = 'SELECT * FROM asignaturas';
        db.query(query, (err, data) => {
            if(err) {
                console.log("error en la consulta", err);
                res.status(500).json({ message: "Error en el servidor al obtener las asignaturas", err: true });
            }
            res.status(200).json({ message: "Asignaturas obtenidas exitosamente", data: data, err: false });
        })
    },
    
    // Metodo para agregar una nueva asignaruta

    addSubject: (req, res) => {

        const queryValue = "SELECT * FROM asignaturas WHERE nombre = ? AND carrera_id = ? AND semestre = ?";

        const { career_id, name,  semester } = req.body;

        db.query(queryValue, [name, career_id, semester], (err, data) => {
            if(err){
                console.log("Error en la consulta", err);
                res.status(500).json({ message: "Error en el servidor", err: true});
            }
            if(data.length > 0) {
                res.status(409).json({ message: "La asignatura ya existe", err: true });
                return;router.delete('/:id', subjectController.deleteSubject);
            }

            const query = 'INSERT INTO asignaturas (carrera_id, nombre, semestre) VALUES (?, ?, ?)';
    
            db.query(query, [career_id, name, semester], (err, data) =>{
                if(err){
                    console.log("error en la consulta", err);
                    res.status(500).json({ message: "Error en el servidor al agregar la asignatura", error: err.message, err: true });
                }
                console.log("consulta exitosa", data);
                res.status(201).json({ message: "Asignatura agregada exitosamente", data: data, err: false });
            });
        });
    },

    // Metodo para buscar los datos de una asignaruta por su identificador (id)

    seachSubject: (req, res) => {
        try {
            const { id } = req.params;
    
            const query = "SELECT * FROM asignaturas WHERE id = ?";
    
            db.query(query, [id], (err, data) => {
                if(err) {
                    console.log("error en la consulta:", err.message);
                    res.status(500).json({ message: "Error en el servidor: ", err: true, errMessage: err.message});
                }
                if(data.length === 0) {
                    res.status(404).json({ message: "Asignatura no encontrada", err: true });
                }else{
                    return;
                }
                console.log("consulta exitosa", data);
                res.status(200).json({ message: "Asignatura encontrada", err: false, data: data });
            });
        } catch (err){
            console.log("Error en la funcion seachSubject:", err.message);
            res.status(500).json({ message: "Error interno del servidor", err: true, errMessage: err.message });
        }
    },

    // Metodo para modificar los valores de una asignatura 

    updateSubject: (req, res) => {
        try {
            const { id } = req.params;
            const { career_id, name, semester } = req.body;

            const query = "UPDATE asignaturas SET carrera_id = ?, nombre = ?, semestre = ? WHERE id = ?";

            db.query(query, [career_id, name, semester, id], (err, data) => {
                if(err) {
                    console.log("Error al modificar una asignatura:", err.message);
                    res.status(500).json({ message: "Error en el servidor: ", err: true, errMessage: err.message});
                }
                if(data.affectedRows === 0) {
                    res.status(404).json({ message: "Asignatura no encontrada", err: true });
                    return;
                }
                console.log("consulta exitosa", data);
                res.status(200).json({ message: "Asignatura actualizada exitosamente", err: false, data: data });
            });
        } catch (err) {
            console.log("Error al modificar una asignatura :", err.message);
            res.status(500).json({ message: "Error interno del servidor", err: true, errMessage: err.message });
        }
    },

    // Metodo para borra una asignatura

    deleteSubject: (req, res) => {
        try{
            const { id } = req.params;
        
            const query = "DELETE FROM asignaturas WHERE id = ?";

            db.query(query, [id], (err, data) => {
                if(err) {
                    console.log("Error al eliminar una asignatura:", err.message);
                    res.status(500).json({ message: "Error en el servidor: ", err: true, errMessage: err.message});
                }
                if(data.affectedRows === 0) {
                    res.status(404).json({ message: "Asignatura no encontrada", err: true });
                    return;
                }
                console.log("consulta exitosa", data);
                res.status(200).json({ message: "Asignatura eliminada exitosamente", err: false, data: data });
            });
            
        } catch (err) {
            console.log("Error al eliminar una asignatura:", err.message);
            res.status(500).json({ message: "Error en el servidor: ", err: true, errMessage: err.message});
        }
    }
}

export default subjectController;

// Puto quien lo lea
