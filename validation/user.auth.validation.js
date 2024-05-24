import { body } from 'express-validator';


export const validateRegistration = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString(),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be at least 8 characters long'),
  body('national_id')
    .notEmpty()
    .isString()
    .isNumeric()
    .withMessage('Invalid national ID'),
  body('phone_number')
    .notEmpty()
    .isString()
    .withMessage('Phone number should be a string')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
  body('city')
    .notEmpty()
    .withMessage('City is required')
    .isString(),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isString(),
  body('longitude')
    .notEmpty()
    .isFloat()
    .toFloat()
    .withMessage('Invalid longitude'),
  body('latitude')
    .notEmpty()
    .isFloat()
    .toFloat()
    .withMessage('Invalid latitude'),
  body('accuracy')
    .notEmpty()
    .isFloat()
    .toFloat()
    .withMessage('Invalid accuracy')
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 50 })
    .withMessage('Invalid password')
];
