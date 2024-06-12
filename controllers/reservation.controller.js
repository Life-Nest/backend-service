import express from 'express';
import { checkSchema } from 'express-validator';
import {
  reservationCreate,
  reservationUpdate,
  userId
} from '../validation/reservation.validation.js';
import {
  validate
} from '../middlewares/validation.js';
import {
  authorizeParent
} from '../middlewares/authorization.js';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} from '../services/reservation.service.js';


const router = express.Route();

router.use(authorizeParent);

router.get(
  '/',
  checkSchema(userId),
  validate,
  getReservations
);


export default router;
