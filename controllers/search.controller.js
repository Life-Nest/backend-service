import express from 'express';
import { checkSchema } from 'express-validator';
import {
  searchParams
} from '../validation/search.schema.js';
import {
  validate
} from '../middlewares/validation.js';
import {
  authorizeParent
} from '../middlewares/authorization.js';
import {
  searchHospital,
  allHospitals
} from '../services/search.service.js';


const router = express.Router();

router.use(authorizeParent);

/* Temporary route for testing purposes */
router.get(
  '/all_hospitals',
  allHospitals
);
/* Temporary route for testing purposes */

router.get(
  '/hospitals',
  checkSchema(searchParams, ['query']),
  validate,
  searchHospital
);


export default router;
