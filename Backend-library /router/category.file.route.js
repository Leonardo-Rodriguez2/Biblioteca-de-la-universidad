import Router from 'express';
import categoryFileController from '../controllers/category.file.controller.js';

const router = Router();

router.get('/',  categoryFileController.getAllCategories)

router.post('/', categoryFileController.addCategory);

router.get('/:id', categoryFileController.searchCategory);

router.put('/:id', categoryFileController.updateCategory);

// router.delete('/:id', categoryFileController.deleteCategory);


const categoryFileRoute = router;

export default categoryFileRoute;