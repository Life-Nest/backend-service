import express from 'express';
const app=express();
import authRoutes from './controllers/auth.controller.js';
import userRoutes from './controllers/user.controller.js';

app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.listen(3000,()=>console.log("server is running on port 3000"));



