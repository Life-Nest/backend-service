// userRoutes.js
import express from 'express';
import {
  userLogin,
  userRegisteration
} from '../services/user.auth.service.js'
import {
  validateRegistration
} from '../validation/parent.registeration.validation.js'
import {
  validateLogin
} from '../validation/login.validation.js'


const router = express.Router();

router.post(
  '/registration',
  validateRegistration,
  userRegisteration
);

router.post(
  '/login',
  validateLogin,
  userLogin
);

export default router; 