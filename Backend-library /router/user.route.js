
import { Router } from 'express';
import teachingController from '../controllers/user.controller.js';

const router = Router();

router.get('/', teachingController.getTeachings);

router.post('/', teachingController.addTeachings);

router.put('/:id', teachingController.updateTeachings);

// Rutas para los filtros de busqueda

router.get('/ci/:ci', teachingController.schearUser);

router.get('/role/:rol', teachingController.schearUserRole);

router.get('/status/:status', teachingController.schearUserStatus);


const routerUser = router;

export default routerUser;



