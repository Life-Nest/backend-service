import express from 'express';
const app=express();
import authRoutes from './controllers/user.auth.controller.js';
import userRoutes from './controllers/user.controller.js';
app.use(express.json());
app.use('/user/auth',authRoutes);
app.use('/user',userRoutes);
app.listen(3000,()=>console.log("server is running on port 3000"));  

 
