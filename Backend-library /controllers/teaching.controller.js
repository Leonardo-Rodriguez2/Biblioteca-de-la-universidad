
import express from 'express';
import db from '../db/connection.js';


const teachingController = {


    getTeachings: (req, res) => {
        const query = "SELECT * FROM docentes";
        db.query(query, (err, data) => {
            if (err) {
                console.log('Error en el servidor:', err);
                return res.status(500).json({ error: ' error la realizar la consulta ' });
            }
            res.status(200).json(data);
        });
    },


    addTeachings : (req, res) => {
        const { id, name,} = req.body;

        const queryId = "SELECT FROM docentes WHERE id = ?";

        db.query(queryId, [id], (err, result)=>{
            if(err){
                console.log("erro: ", err);
            }
            if(result){
                res.status(400).json({ mesaage: "El id no se puede repetir", err: true });
            }

            const query = 'INSERT INTO docentes (id, Nombre) VALUES (?, ?)';
            db.query(query, [id, name], (err, result) => {
                if (err) {
                    console.error('Error en el servidor:', err);
                    return res.status(500).json({ error: 'Error al realizar la consulta' });
                }
    
            });
            res.status(200).json({ mesage: "El docente se agrego", err: false });

        } )

    },  

    schearTeachings: (req, res) => {
        const { id } = req.params;
        const query = "SELECT * FROM docentes WHERE id = ?";

        db.query(query, [id], (err, data)=> {
            if(err){
                console.log(`Error en la consulta el error es:  ${ err }`);
                res.status(500).json({ message: "Error en el servidor", err: true });
            }
            if(data.length === 0){
                return res.status(404).json({ message: "No se encontro el docente", err: true });
            }
            res.status(200).json({ id: id, data: data, err: false});
        })
    },

    deleteTeachings: (req, res) => {
        const { id } =  req.params;
        const query = "DELETE FROM docentes WHERE id = ?";

        db.query(query, [id], (err, result)=>{
            if(err){
                console.log(`Error en la consulta ${err}`);
                res.stauts(500).json({ message: "Error en el servidor", err: true });
            }
            if(result.length === 0){

            }
            res.status(200).json({ id: id, message: "Se elimino el docente", data: result, err: false })
        })
    },



    updateTeachings: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        const query = "UPDATE docentes SET id= ?, Nombre  = ? WHERE id = ?";

        db.query(query, [id, name, id], (err, resutl) => {
            if(err){
                console.log("Error en el servidor ", err);
            }
            res.status(200).json({ message: "Datos del usuario actualizado", err: false });
        })

    }



}


export default teachingController;