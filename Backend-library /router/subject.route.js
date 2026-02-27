
import Router from 'express';
import subjectController from '../controllers/subject.controller.js';
import jwtMiddleware from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/', subjectController.getAllSubjects);

router.post('/', subjectController.addSubject);

router.get('/:id', subjectController.seachSubject);

router.put('/:id', subjectController.updateSubject);

router.delete('/:id',  subjectController.deleteSubject);


export default router;