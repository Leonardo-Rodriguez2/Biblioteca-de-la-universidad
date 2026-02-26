
import { Router } from 'express';
import teachingController from '../controllers/user.controller.js';

const router = Router();

router.get('/', teachingController.getTeachings);

router.post('/', teachingController.addTeachings);

router.get('/:id', teachingController.schearTeachings);

router.get('/role/:rol', teachingController.schearUserRole)

router.put('/:id', teachingController.updateTeachings);

const routerUser = router;

export default routerUser;



