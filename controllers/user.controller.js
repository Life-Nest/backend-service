// userRoutes.js
import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../services/user.service.js';
import {
  validateUpdateUser
} from '../validation/updateUser.validation.js';


const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', validateUpdateUser, updateUser);

export default router;