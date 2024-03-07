// userRoutes.js
import express from 'express';
const router = express.Router();
import { getParents } from '../services/parent.service.js';

router.get('/', (req,res)=>{
    res.send(getParents());

});

export default router;