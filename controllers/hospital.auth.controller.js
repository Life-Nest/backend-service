import express from 'express';
const router = express.Router();
import { login, registration } from '../services/hospital.auth.service.js';
import { validateHospitalRegistration, validateHospitalLogin } from '../validation/hospital.validation.js';

router.post("/registration", validateHospitalRegistration, (req, res) => {

    registration(req)
        .then(async (registeredHospital) => {
            res.status(201).json(registeredHospital);
        }).catch(async (err) => {

            const { error, code } = err
            if (error) {
                return res.status(code).json({ error });
            }
            if (err.code === 'P2002' && err.meta.target.includes('email')) {
                return res.status(409).json({ error: 'Email is already in use' });
            } else {
                res.status(500).json({ error: err.message })
            }

        });
});

router.post("/login", validateHospitalLogin, (req, res) => {
    login(req)
        .then((token) => {
            res.status(200).json({token});
        }).catch((err) => {

            const { error, code } = err
            if (error) {
                return res.status(code).json({ error });
            }

            res.status(500).json({ error: err.message })

        });
});
export default router;