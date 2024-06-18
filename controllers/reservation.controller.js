import express from 'express';
import { checkSchema } from 'express-validator';
import {
  reservationCreate,
  reservationUpdate,
  reservationId,
  parentId
} from '../validation/reservation.validation.js';
import {
  validate
} from '../middlewares/validation.js';
import {
  authorizeParent
} from '../middlewares/authorization.js';
import {
  getReservations,
  getUserReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} from '../services/reservation.service.js';


const router = express.Router();

router.get(
  '/all',
  getReservations
);

router.get(
  '/',
  authorizeParent,
  checkSchema(parentId),
  validate,
  getUserReservations
);

router.get(
  '/:reservationId',
  authorizeParent,
  checkSchema(reservationId),
  checkSchema(parentId),
  validate,
  getReservation
);

router.post(
  '/',
  authorizeParent,
  checkSchema(parentId),
  checkSchema(reservationCreate),
  validate,
  createReservation
);

router.patch(
  '/:reservationId',
  authorizeParent,
  checkSchema(reservationId),
  checkSchema(parentId),
  checkSchema(reservationUpdate),
  validate,
  updateReservation
);

router.delete(
  '/:reservationId',
  authorizeParent,
  checkSchema(reservationId),
  checkSchema(parentId),
  validate,
  deleteReservation
);


export default router;
