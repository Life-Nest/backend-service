import express from 'express';
import {
  validateHospitalUpdate
} from '../validation/hospital.validation.js';
import {
  updateHospital,
  deleteHospital,
  getHospital,
  getAllHospital
} from '../services/hospital.service.js';


const router = express.Router();

router.get(
  '/',
  (req, res) => {
    getAllHospital(req)
      .then(hospitals => {
        res.status(200).json({hospitals});
      })
      .catch(err => {
        const { code, error } = err;
        if (error) {
          return res.status(code).json({ error });
        }
        res.status(500).json({
          msg: "Server Error Geting all the user failed",
          error: err.message
        });
      });
  }
);

router.get(
  '/:id',
  (req, res) => {
    getHospital(req.params.id)
      .then((hospital) => {
        res.status(200).json(hospital);
      })
      .catch(err => {
        const { code, error } = err;
        if (error) {
          return res.status(code).send({ error });
        }
        res.status(500).send({
          msg: "Server Error Hospital getting failed",
          error: err.message
        });
      })
  }
);

router.patch(
  '/:id',
  validateHospitalUpdate,
  (req, res) => {
    updateHospital(req)
      .then(updatedHospital => {
        res.status(200).json({updatedHospital});
      })
      .catch(err => {
        if (err.code === 'P2002' && err.meta.target.includes('email')) {
          return res.status(409).json({
            msg:'',
            error: 'Email is already in use'
          });
        }
        const { code, error } = err;
        if (error) {
          return res.status(code).json({ error });
        }
        res.status(500).json({
          msg: "server Error Geting user failed",
          error: err.message
        });
      });
  }
);


router.delete(
  '/:id',
  (req, res) => {
    deleteHospital(req.params.id)
      .then((deletedHospital) => {
        res.status(200).json({deletedHospital});
      })
      .catch(err => {
        const { code, error } = err;
        if (error) {
          return res.status(code).send({ error });
        }
        res.status(500).json({
          msg: "Server Error Deleting hospital failed",
          error: err.message
        });
      })
  }
);

export default router;