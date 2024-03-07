import express from 'express';
const app=express();
import authRoutes from './controllers/auth.controller.js';
import userRoutes from './controllers/parent.controller.js';

app.use('/auth',authRoutes);
app.use('/parent',userRoutes);
app.listen(3000,()=>console.log("server is running on port 3000"));