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
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} from '../services/reservation.service.js';


const router = express.Router();

router.use(authorizeParent);

router.get(
  '/',
  checkSchema(parentId),
  validate,
  getReservations
);

router.get(
  '/:reservationId',
  checkSchema(reservationId),
  checkSchema(parentId),
  validate,
  getReservation
);

router.post(
  '/',
  checkSchema(parentId),
  checkSchema(reservationCreate),
  validate,
  createReservation
);

router.patch(
  '/:reservationId',
  checkSchema(reservationId),
  checkSchema(parentId),
  checkSchema(reservationUpdate),
  validate,
  updateReservation
);

router.delete(
  '/:reservationId',
  checkSchema(reservationId),
  checkSchema(parentId),
  validate,
  deleteReservation
);


export default router;
