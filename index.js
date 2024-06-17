import express from 'express';

import userRoutes from './controllers/user.controller.js';
import incubatorRoutes from './controllers/incubator.controller.js';
import hospitalRoutes from './controllers/hospital.controller.js';
import searchRoute from './controllers/search.controller.js';
import reservationRoutes from './controllers/reservation.controller.js';
import staffRoutes from './controllers/staff.controller.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());
app.use('/user', userRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/staff', staffRoutes); 
app.use('/reservations', reservationRoutes);

app.use('/hospitals', searchRoute);
app.use(incubatorRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Incubator API root endpoint" });
});

app.all('*', (req, res) => {
  res.status(404).json({
    error: {
      message: "Not Found",
      code: 404
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
}); 
