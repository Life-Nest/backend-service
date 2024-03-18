import express from 'express';
const router = express.Router();
import { validateHospitalUpdate } from '../validation/hospital.validation.js';
import { updateHospital, deleteHospital, getHospital, getAllHospital } from '../services/hospital.service.js';
router.patch('/:id', validateHospitalUpdate, (req, res) => {
    updateHospital(req)
        .then(updatedHospital => {
            res.status(200).json(updatedHospital);
        }).catch(err => {
            if (err.code === 'P2002' && err.meta.target.includes('email')) {
                return res.status(409).json({ error: 'Email is already in use' });
            }
            const { code, error } = err;
            res.status(code).json({ error });
        });
})
router.get('/', (req, res) => {
    getAllHospital(req)
        .then(hospitals => {
            res.status(200).json(hospitals);
        }).catch(err => {
            const { code, error } = err;
            res.status(code).json({ error });
        });
})

router.delete('/:id', (req, res) => {
  
    deleteHospital(req.params.id)
        .then((deletedHospital) => {
            res.status(200).json(deletedHospital);
        }).catch(err => {
            const {code,error}=err;
            if(error){
                return res.status(code).send({error});
            }
            res.status(404).send({error:"Hospital not found"});
        })
})

router.get('/:id', (req, res) => {
    getHospital(req.params.id)
        .then((hospital) => {
            res.status(200).json(hospital);
        }).catch(err => {
            const {code,error}=err;
            if(error){
                return res.status(code).send({error});
            }
            res.status(500).send({error:"hospital getting failed"});
        })
})

export default router;