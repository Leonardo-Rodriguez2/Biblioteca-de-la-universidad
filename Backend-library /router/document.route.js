import { Router } from 'express';
import DocumentController from '../controllers/document.controller.js';
import upload from '../middleware/upload.middleware.js';
import jwtMiddleware from '../middleware/jwt.middleware.js';

const router = Router();

// Aplicar verificación JWT a todas las rutas de documentos
router.use(jwtMiddleware.verifyJwt);

// Obtener documentos (con filtros opcionales en query params)
router.get('/', DocumentController.getDocuments);

// Subir un nuevo documento (usa multer)
router.post('/upload', upload.single('archivo'), DocumentController.uploadDocument);

// Actualizar estado de aprobación (Admin)
router.put('/:id/status', DocumentController.updateDocumentStatus);

// Descargar un documento
router.get('/download/:id', DocumentController.downloadDocument);

// Mantener compatibilidad
router.get('/:id', DocumentController.getContentDocument);

export default router;
