// userRoutes.js
import express from 'express';
const router = express.Router();
import {
  userLogin,
  userRegisteration
} from '../services/user.auth.service.js';
import {
  validateRegistration,
  validateLogin
} from '../validation/user.auth.validation.js';



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
