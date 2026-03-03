
import db from '../db/connection.js';

const PnfController = {
    
    getAllPnf: async (req, res) => {
        try {

            const query = 'SELECT * FROM carreras';

            const [data] = await db.query(query);

            if (data.length === 0) {
                return res.status(404).json({ message: 'No se encontraron PNF' });
            }

            res.status(200).json(data);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener los PNF' }); 
        }
    },

    addPnf: async (req, res) => {
        try {
            const { nombre, codigo } = req.body;

            if(!nombre || !codigo) {
                return res.status(400).json({ message: 'Faltan campos requeridos' });
            };

            const query = 'INSERT INTO carreras (nombre, codigo) VALUES (?, ?)';
            const [data] = await db.query(query, [nombre, codigo]);

            if (data.affectedRows === 0) {
                return res.status(400).json({ message: 'No se pudo agregar el PNF' });
            }

            res.status(201).json({ message: 'PNF agregado correctamente', id: data.insertId });
        } catch (err) {
            console.error("Error en la consulta ",err)
        }
    },

    UpdatePnf: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, codigo } = req.body;

            if(!nombre || !codigo) {
                return res.status(400).json({ message: 'Faltan campos requeridos' });
            };
            
            const query = 'UPDATE carreras SET nombre = ?, codigo = ? WHERE id = ?';
            const [data] = await db.query(query, [nombre, codigo, id]);
            
            if (data.affectedRows === 0) {
                return res.status(404).json({ message: 'PNF no encontrado' });
            }
            res.status(200).json({ message: 'PNF actualizado correctamente' });
        } catch (err) {
            console.error("Error en la consulta ",err)
            res.status(500).json({ error: 'Error al actualizar el PNF' });
        }
    },

}

export default PnfController;