import { body } from 'express-validator';


// Validation middleware for hospital registration
export const validateHospitalRegistration = [
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be between 8 and 50 characters'),
  body('name')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be a string with length between 1 and 50 characters'),
  body('type')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Type must be a string with length between 1 and 50 characters'),
  body('phone_number')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Phone number must be a string with length between 1 and 50 characters'),
  body('city')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('City must be a string with length between 1 and 50 characters'),
  body('address')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Address must be a string with length between 1 and 50 characters'),
  body('longitude')
    .isFloat()
    .withMessage('Longitude must be a floating-point number'),
  body('latitude')
    .isFloat()
    .withMessage('Latitude must be a floating-point number'),
  body('accuracy')
    .isFloat()
    .withMessage('Accuracy must be a floating-point number')
];

// Validation middleware for hospital login
export const validateHospitalLogin = [
    body('email')
      .isEmail()
      .withMessage('Email must be a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
];


// Validation middleware for hospital updates
export const validateHospitalUpdate = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password_hash')
    .optional()
    .isLength({ min: 8, max: 100 })
    .withMessage('Password must be between 8 and 100 characters'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be a string with length between 1 and 50 characters'),
  body('type')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Type must be a string with length between 1 and 50 characters'),
  body('phone_number')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Phone number must be a string with length between 1 and 50 characters'),
  body('city')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('City must be a string with length between 1 and 50 characters'),
  body('address')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Address must be a string with length between 1 and 50 characters'),
  body('longitude')
    .optional()
    .isFloat()
    .withMessage('Longitude must be a floating-point number'),
  body('latitude')
    .optional()
    .isFloat()
    .withMessage('Latitude must be a floating-point number'),
  body('accuracy')
    .optional()
    .isFloat()
    .withMessage('Accuracy must be a floating-point number')
];