
import { Router } from 'express';
import teachingController from '../controllers/teaching.controller.js';

const router = Router();

router.get('/', teachingController.getTeachings);

router.post('/', teachingController.addTeachings);

router.get('/:id', teachingController.schearTeachings);

router.delete('/:id', teachingController.deleteTeachings);

router.post('/:id', teachingController.updateTeachings);

export default router;



