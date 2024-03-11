// userRoutes.js
import express from 'express';
const router = express.Router();
import { getUsers, getUser, updateUser, deleteUser } from '../services/user.service.js';
import {validateUpdateUser} from '../validation/updateUser.validation.js'; 
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id',validateUpdateUser,updateUser);
export default router;