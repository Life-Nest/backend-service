// userRoutes.js
import express from 'express';
const router = express.Router();
import { getParents } from '../services/parent.service.js';

router.get('/', async(req,res)=>{
    let parents=await getParents();
    res.send(parents);
    
});

export default router;