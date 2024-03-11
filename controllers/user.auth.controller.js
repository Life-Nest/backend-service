// userRoutes.js
import express from 'express';
const router = express.Router();

import {userLogin,userRegisteration} from '../services/user.auth.service.js'

import {validateRegistration} from '../validation/parent.registeration.validation.js'
import {validateLogin} from '../validation/login.validation.js'
router.post('/registration',validateRegistration, userRegisteration);
router.post('/login',validateLogin, userLogin);
export default router; 