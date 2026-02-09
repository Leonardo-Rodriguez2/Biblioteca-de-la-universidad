
import Router from 'express';
import subjectController from '../controllers/subject.controller.js';

const router = Router();

router.get('/', subjectController.getAllSubjects);


export default router;