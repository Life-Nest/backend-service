import express from 'express';
const router = express.Router();

import { login,register } from '../services/staff.auth.service.js';

router.post('/login',login)

router.post('/register',register)

export default router;