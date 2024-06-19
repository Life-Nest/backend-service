import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import userRoutes from './controllers/user.controller.js';
import incubatorRoutes from './controllers/incubator.controller.js';
import hospitalRoutes from './controllers/hospital.controller.js';
import searchRoute from './controllers/search.controller.js';
import reservationRoutes from './controllers/reservation.controller.js';
import staffRoutes from './controllers/staff.controller.js';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/staff', staffRoutes); 
app.use('/incubators', incubatorRoutes);
app.use('/reservations', reservationRoutes);
app.use('/hospitals', searchRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    "name": "LifeNest API",
    "version": "1.0.0",
    "description": "This is a sample API that serves incubators organizing and reservation system.",
    "endpoints": {
      "/user": "Retrieve information about users",
      "/reservations": "Manage reservations",
      "/hospital": "Retrieve information about hospitals",
      "/incubators": "Manage incubator resources",
      "/staff": "Retrieve information about staff"
    },
    "documentation": "https://trello.com/b/1RDIsdvd/api-documentation",
    "status": "API is up and running"
  });
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
