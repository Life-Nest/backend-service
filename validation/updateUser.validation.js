import { body } from 'express-validator';

export const validateUpdateUser = [
    body('name').optional().isLength({ min: 1, max: 50 }).withMessage('Name must be between 1 and 50 characters'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('password').optional().isLength({ min: 8,max:50 }).withMessage('Password must be at least 6 characters long'),
    body('national_id').optional().isLength({ min: 14, max: 14 }).withMessage('National ID must be between 1 and 50 characters'),
    body('phone_number').optional().isLength({ min: 1, max: 50 }).withMessage('Phone number must be between 1 and 50 characters'),
    body('city').optional().isLength({ min: 1, max: 50 }).withMessage('City must be between 1 and 50 characters'),
    body('address').optional().isLength({ min: 1, max: 50 }).withMessage('Address must be between 1 and 50 characters'),
    
];