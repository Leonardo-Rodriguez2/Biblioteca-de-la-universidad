
import Router from 'express';
import PnfController from '../controllers/pnf.controller.js';

const router = Router();

router.get('/', PnfController.getAllPnf);

router.post('/', PnfController.addPnf);

router.put('/:id', PnfController.UpdatePnf);



const routerPnf = router;

export default routerPnf;