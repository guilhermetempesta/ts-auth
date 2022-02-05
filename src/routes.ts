import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import AuthController from './app/controller/AuthController';
import UserController from './app/controller/UserController';

const router = Router();

router.post('/auth', AuthController.authenticate);
router.post('/users', UserController.store);
router.get('/users', authMiddleware, UserController.index);

export default router;