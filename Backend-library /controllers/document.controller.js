import db from "../db/connection.js";
import path from 'path';
import fs from 'fs';

const DocumentController = {

    // Subir un nuevo documento
    uploadDocument: async (req, res) => {
        try {
            const { titulo, resumen, tipo, categoria_id, asignatura_id, tutor_id } = req.body;
            const file = req.file;
            const autor_id = req.user.id;

            if (!file) {
                return res.status(400).json({ message: "No se ha subido ningún archivo", err: true });
            }

            // Insertar en la tabla documentos
            const [docResult] = await db.query(
                "INSERT INTO documentos (titulo, resumen, tipo, categoria_id, asignatura_id, autor_id, tutor_id, estado_aprobacion) VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDIENTE')",
                [titulo, resumen, tipo, categoria_id, asignatura_id, autor_id, tutor_id || null]
            );

            const documento_id = docResult.insertId;

            // Insertar en la tabla versiones_archivos
            const peso_mb = (file.size / (1024 * 1024)).toFixed(2);
            const formato = path.extname(file.originalname).replace('.', '').toUpperCase();

            await db.query(
                "INSERT INTO versiones_archivos (documento_id, url_archivo, nombre_original, formato, peso_mb, subido_por) VALUES (?, ?, ?, ?, ?, ?)",
                [documento_id, file.filename, file.originalname, formato, peso_mb, autor_id]
            );

            res.status(201).json({ 
                message: "Documento subido exitosamente. Pendiente de verificación.", 
                documento_id 
            });

        } catch (err) {
            console.error("Error al subir documento:", err);
            res.status(500).json({ message: "Error en el servidor al subir el documento", err: true });
        }
    },

    // Obtener documentos con filtros
    getDocuments: async (req, res) => {
        try {
            const { estado, categoria, asignatura, tipo, search, autor } = req.query;
            
            let query = `
                SELECT d.*, v.url_archivo, v.nombre_original, v.formato, v.peso_mb, 
                       c.nombre as categoria_nombre, a.nombre as asignatura_nombre,
                       u.nombre as autor_nombre
                FROM documentos d
                LEFT JOIN versiones_archivos v ON d.id = v.documento_id
                LEFT JOIN categorias c ON d.categoria_id = c.id
                LEFT JOIN asignaturas a ON d.asignatura_id = a.id
                LEFT JOIN usuarios u ON d.autor_id = u.id
                WHERE (v.id = (SELECT MAX(id) FROM versiones_archivos WHERE documento_id = d.id) OR v.id IS NULL)
            `;
            
            const params = [];

            if (estado) {
                query += " AND d.estado_aprobacion = ?";
                params.push(estado);
            }

            if (categoria) {
                query += " AND d.categoria_id = ?";
                params.push(categoria);
            }

            if (asignatura) {
                query += " AND d.asignatura_id = ?";
                params.push(asignatura);
            }

            if (tipo) {
                query += " AND d.tipo = ?";
                params.push(tipo);
            }

            if (autor) {
                query += " AND d.autor_id = ?";
                params.push(autor);
            }

            if (search) {
                query += " AND (d.titulo LIKE ? OR d.resumen LIKE ?)";
                params.push(`%${search}%`, `%${search}%`);
            }

            query += " ORDER BY d.fecha_subida DESC";

            console.log("getDocuments query params:", req.query);
            const [rows] = await db.query(query, params);
            console.log("getDocuments result count:", rows.length);
            res.status(200).json({ message: "Documentos obtenidos", data: rows });

        } catch (err) {
            console.error("Error al obtener documentos:", err);
            res.status(500).json({ message: "Error en el servidor", err: true });
        }
    },

    // Actualizar estado de aprobación (Admin)
    updateDocumentStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { estado } = req.body; // 'APROBADO', 'RECHAZADO', etc.

            if (!['APROBADO', 'RECHAZADO', 'PENDIENTE', 'REVISION', 'PUBLICADO'].includes(estado)) {
                return res.status(400).json({ message: "Estado de aprobación inválido", err: true });
            }

            const [result] = await db.query(
                "UPDATE documentos SET estado_aprobacion = ? WHERE id = ?",
                [estado, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Documento no encontrado", err: true });
            }

            res.status(200).json({ message: `Documento ${estado.toLowerCase()} exitosamente` });

        } catch (err) {
            console.error("Error al actualizar estado:", err);
            res.status(500).json({ message: "Error en el servidor", err: true });
        }
    },

    // Descargar un archivo
    downloadDocument: async (req, res) => {
        try {
            const { id } = req.params; // ID de la versión o del documento (aquí usaremos el del documento para obtener la última versión)
            
            const [rows] = await db.query(
                "SELECT url_archivo, nombre_original FROM versiones_archivos WHERE documento_id = ? ORDER BY id DESC LIMIT 1",
                [id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Archivo no encontrado", err: true });
            }

            const { url_archivo, nombre_original } = rows[0];
            const filePath = path.join(process.cwd(), 'uploads', url_archivo);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "El archivo físico no existe en el servidor", err: true });
            }

            res.download(filePath, nombre_original);

        } catch (err) {
            console.error("Error al descargar archivo:", err);
            res.status(500).json({ message: "Error en el servidor", err: true });
        }
    },

    // Mantener compatibilidad si se usa en algún lado
    getContentDocument: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.query(
                "SELECT v.url_archivo FROM versiones_archivos v WHERE v.documento_id = ? ORDER BY v.id DESC LIMIT 1",
                [id]
            );
            
            if (rows.length === 0) {
                return res.status(404).json({ message: "Documento no encontrado" });
            }

            const filePath = path.join(process.cwd(), 'uploads', rows[0].url_archivo);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "Archivo no encontrado" });
            }

            const content = fs.readFileSync(filePath, 'utf-8');
            res.status(200).json({ message: content });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error en el servidor", err: true });
        }
    }
}

export default DocumentController;

