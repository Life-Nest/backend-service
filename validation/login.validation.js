import { body } from 'express-validator';


export const validateLogin = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage("write valid email"),
    body('password')
      .notEmpty()
      .withMessage('provide the password')
];