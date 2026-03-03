
import { Router } from 'express';
import WarehousesController from '../controllers/warehouses.controller.js';

const router = Router();

router.get('/', WarehousesController.getAllWarehouses);

router.post('/', WarehousesController.createWarehouse);

router.put('/:id', WarehousesController.updateWarehouse);

const routerWarehouses = router;

export default routerWarehouses;
