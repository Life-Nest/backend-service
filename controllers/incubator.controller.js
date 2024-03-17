import express from 'express';
import {
  getAllIncubators,
  getIncubator,
  createIncubator,
  updateIncubator,
  deleteIncubator
} from '../services/incubator.service.js';


const router = express.Router();

router.get('/incubators', (req, res) => {
  getAllIncubators()
    .then(async (allIncubators) => {
      res.json(allIncubators);
    })
    .catch(async (error) => {
      console.error(error);
      res.json({error: error.message});
    });
});

router.get('/incubators/:id', (req, res) => {
  const incubatorId = req.params.id;

  getIncubator(incubatorId)
    .then(async (incubator) => {
      res.json(incubator);
    })
    .catch(async (error) => {
      console.error(error);
      res.json({error: error.message});
    });
});

router.post('/incubators', (req, res) => {
  const payload = req.body;

  createIncubator(payload)
    .then(async (createdIncubator) => {
      res.json(createdIncubator);
    })
    .catch(async (error) => {
      console.error(error);
      res.json({error: error.message});
    });
});

router.patch('/incubators/:id', (req, res) => {
  const incubatorId = req.params.id;
  const payload = req.body;

  updateIncubator(incubatorId, payload)
    .then(async (updatedIncubator) => {
      res.json(updatedIncubator);
    })
    .catch(async (error) => {
      console.error(error);
      res.json({error: error.message});
    });
});

router.delete('/incubator/:id', (req, res) => {
  const incubatorId = req.params.id;

  deleteIncubator(incubatorId)
    .then(async (deletedIncubator) => {
      res.json(deletedIncubator);
    })
    .catch(async (error) => {
      console.error(error);
      res.json({error: error.message});
    });
});


export default router;
