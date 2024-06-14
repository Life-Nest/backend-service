import express from 'express';
const router = express.Router();
import { GetAllStaff,GetStaffById,DeleteStaffById ,UpdateStaff} from '../services/staff.service.js';
router.get('/', GetAllStaff)
router.get('/:id', GetStaffById)
router.delete('/:id', DeleteStaffById)
router.patch('/:id', UpdateStaff)

export default router;