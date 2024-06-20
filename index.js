import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
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
const server = createServer(app);
const wss = new WebSocketServer({ server });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectedClients = new Map();
let id = 0;

wss.on('connection', (ws, req) => {
  ws.on('error', console.error);

  connectedClients.set(id, ws);
  id = id + 1;

  console.log('Connection Established');
  //console.log(connectedClients);
  //console.log(wss.clients);

  ws.on('close', () => console.log('Client has disconnected!'));

  ws.on('message', message => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === 'authorization') {
        if (!token && token === '') {
          ws.send(
            JSON.stringify({
              error: {
                message: 'Unauthorized',
                code: 401
              }
            })
          );
        }

        ws.send(JSON.stringify({ type: 'authorization', status: 'success' }));

        console.log(`Received message: ${message}`);
        console.log('Parsed message:');
        console.log(parsedMessage);
      } else {
        /*connectedClients.forEach((value, key) => {
          if (value !== ws) {
            value.send(`Message sent from client ${key}: ${message}`);
          }
        });*/
      }
    } catch (err) {
      if (err.name === 'SyntaxError') {
        ws.send(
          JSON.stringify({
            error: {
              message: 'Not valid JSON',
              code: 400
            }
          })
        );
      } else {
        console.error(err);
      }
    }
  });
});

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

app.get('/client', (req, res) => {
  res.sendFile('/ws-client.html', { root: __dirname });
});

app.all('*', (req, res) => {
  res.status(404).json({
    error: {
      message: "Not Found",
      code: 404
    }
  });
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
}); 
