import express from 'express';

import userAuthRoutes from './controllers/user.auth.controller.js';
import userRoutes from './controllers/user.controller.js';
import incubatorRoutes from './controllers/incubator.controller.js';
import hospitalAuthRoutes from './controllers/hospital.auth.controller.js';
import hospitalRoutes from './controllers/hospital.controller.js';
const app = express();

app.use(express.json());
app.use('/users/auth', userAuthRoutes);
app.use('/users', userRoutes);
app.use('/hospitals/auth', hospitalAuthRoutes);
app.use('/hospitals', hospitalRoutes);
app.use(incubatorRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Incubator API root endpoint" });
});

app.all('*', (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
}); 
