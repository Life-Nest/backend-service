import { body } from 'express-validator';


export const validateRegistration = [
  body('name').notEmpty().withMessage('Name is required').isString(),
  body('email').notEmpty().isEmail().withMessage('Invalid email address').isString(),
  body('password').notEmpty().isLength({ min: 8, max: 50 }).withMessage('Password must be at least 8 characters long'),
  body('national_id').notEmpty().isInt().withMessage('Invalid national ID'),
  body('phone_number').notEmpty().isMobilePhone().withMessage('Invalid phone number'),
  body('city').notEmpty().withMessage('City is required').isString(),
  body('address').notEmpty().withMessage('Address is required').isString(),
  body('longitude').notEmpty().isFloat().withMessage('Invalid longitude'),
  body('latitude').notEmpty().isFloat().withMessage('Invalid latitude'),
  body('accuracy').notEmpty().isFloat().withMessage('Invalid accuracy')
];