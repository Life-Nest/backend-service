import express from 'express';
import {
  hospitalId,
  incubatorId,
  incubatorCreate,
  incubatorUpdate
} from '../validation/incubator.validation.js';
import {
  validationResult,
  matchedData,
  checkSchema
} from 'express-validator';
import {
  getAllIncubators,
  getIncubator,
  createIncubator,
  updateIncubator,
  deleteIncubator
} from '../services/incubator.service.js';
import { serviceHandler } from './handlers.js';


const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return { msg: error.msg };
  }
});

const router = express.Router();
const prefix = '/hospitals/:hospital_id/incubators';
const path = (path) => prefix + path;

router.get(
  path('/'),
  checkSchema(hospitalId),
  (req, res) => {
    const result = myValidationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    serviceHandler(getAllIncubators, data.hospital_id, res);
  }
);

router.get(
  path('/:incubator_id'),
  checkSchema(hospitalId),
  checkSchema(incubatorId),
  (req, res) => {
    const result = myValidationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    serviceHandler(getIncubator, data, res);
  }
);

router.post(
  path('/'),
  checkSchema(hospitalId),
  checkSchema(incubatorCreate),
  (req, res) => {
    const result = myValidationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    serviceHandler(createIncubator, data, res);
  }
);

router.patch(
  path('/:incubator_id'),
  checkSchema(hospitalId),
  checkSchema(incubatorId),
  checkSchema(incubatorUpdate),
  (req, res) => {
    const result = myValidationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    serviceHandler(updateIncubator, data, res);
  }
);

router.delete(
  path('/:incubator_id'),
  checkSchema(hospitalId),
  checkSchema(incubatorId),
  (req, res) => {
    const result = myValidationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    serviceHandler(deleteIncubator, data, res);
  }
);


export default router;
