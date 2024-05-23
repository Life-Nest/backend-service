// userRoutes.js
import express from 'express';
import {
  userLogin,
  userRegisteration
} from '../services/user.auth.service.js';
import {
  validateRegistration,
  validateLogin
} from '../validation/user.auth.validation.js';


const router = express.Router();

router.post(
  '/signup',
  validateRegistration,
  userRegisteration
);

router.post(
  '/login',
  validateLogin,
  userLogin
);

export default router; 
