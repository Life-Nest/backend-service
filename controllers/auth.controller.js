// userRoutes.js
import express from 'express';
const router = express.Router();
import  { validationResult } from'express-validator';
import {parentRegister} from '../services/auth.service.js'

import {validateRegistration} from '../validation/parent_registeration.js'

router.post('/parentRegister',validateRegistration, async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let result=await parentRegister(req.body)

    res.send(result).status(201);
});

export default router;