// userRoutes.js
import express from 'express';
const router = express.Router();
import { getParents } from '../services/user.service.js';

router.get('/parents', (req,res)=>{
    res.send(getParents());

});

export default router;