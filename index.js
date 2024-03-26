import express from 'express';

import userAuthRoutes from './controllers/user.auth.controller.js';
import userRoutes from './controllers/user.controller.js';
import incubatorRoutes from './controllers/incubator.controller.js';
import hospitalAuthRoutes from './controllers/hospital.auth.controller.js';
import hospitalRoutes from './controllers/hospital.controller.js';
const app = express();

app.use(express.json());
app.use('/user/auth', userAuthRoutes);
app.use('/user', userRoutes);
app.use('/hospital/auth', hospitalAuthRoutes);
app.use('/hospital', hospitalRoutes);
app.use(incubatorRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000");
}); 
