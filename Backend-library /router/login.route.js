import express from 'express';
import { loginController } from '../controllers/login.controller.js';

const router = express.Router();

router.post('/', loginController.loginSession);

router.post('/:idUni/:idDocente/:idDocumento', loginController.loginIdUser)
    
export default router; 

