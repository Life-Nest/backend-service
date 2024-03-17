import express from 'express';
import authRoutes from './controllers/user.auth.controller.js';
import userRoutes from './controllers/user.controller.js';
import incubatorRoutes from './controllers/incubator.controller.js';

const app = express();

app.use(express.json());
app.use('/user/auth', authRoutes);
app.use('/parent', userRoutes);
app.use('/api/v1', incubatorRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000");
}); 
