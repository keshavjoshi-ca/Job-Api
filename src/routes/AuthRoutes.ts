import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { Authentication } from '../middleware/Authentication';

const router = express.Router();

router.post('/login', AuthController.validateLogin)

router.post('/user', AuthController.registerUser)

router.get('/users', Authentication, AuthController.getAllUsers)

export default router;