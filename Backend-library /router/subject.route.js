
import Router from 'express';
import subjectController from '../controllers/subject.controller.js';
import jwtMiddleware from '../middleware/jwt.middleware.js';

const router = Router();

router.get('/', jwtMiddleware.verifyJwt, subjectController.getAllSubjects);

router.post('/', jwtMiddleware.verifyJwt, subjectController.addSubject);

router.get('/:id', jwtMiddleware.verifyJwt, subjectController.seachSubject);

router.put('/:id', jwtMiddleware.verifyJwt, subjectController.updateSubject);

router.delete('/:id', jwtMiddleware.verifyJwt,  subjectController.deleteSubject);


export default router;