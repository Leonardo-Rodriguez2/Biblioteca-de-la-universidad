import db from '../db/connection.js';

const categoryFileController = {
    
    getAllCategories: async (req, res) => {
        try {
            const [data] = await db.query('SELECT * FROM categorias');

            if (data.length === 0) {
                return res.status(404).json({ message: 'No se encontraron categorías' });
            }

            if (data.length > 0) { 
                return res.status(200).json({ data });
            }

        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ message: 'Error al obtener las categorías' });
        }
    },

    addCategory: async (req, res) => {
        try {
            const { name, description, nombre, descripcion } = req.body;

            const finalName = name || nombre;
            const finalDescription = description || descripcion;

            if (!finalName) {
                return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
            }

            const [result] = await db.query(
                'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
                [finalName, finalDescription]
            );

            res.status(201).json({ message: 'Categoría creada exitosamente', id: result.insertId });
        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ message: 'Error al crear la categoría' });
        }
    },

    searchCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const [data] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);

            if (data.length === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            res.json(data[0]);
        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ message: 'Error al buscar la categoría' });
        }
    },
    
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, nombre, descripcion } = req.body;

            const finalName = name || nombre;
            const finalDescription = description || descripcion;

            if (!finalName) {
                return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
            }

            const [result] = await db.query(
                'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
                [finalName, finalDescription, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            res.json({ message: 'Categoría actualizada exitosamente' });
        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ message: 'Error al actualizar la categoría' });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const [result] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            res.json({ message: 'Categoría eliminada exitosamente' });
        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).json({ message: 'Error al eliminar la categoría' });
        }
    },

}

export default categoryFileController;
