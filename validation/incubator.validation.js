import { param, body } from 'express-validator';

/**
 * getIncubatorSchema - A function to specify which fields will strictly validated.
 *
 * @isOpt1: A boolean value to specify if the incubator_id will be optional or not
 * @isOpt2: A boolean value to specify if the incubator data will be optional or not
 *
 * Return: The final incubator schema.
 */
function getIncubatorSchema(isOpt1 = true, isOpt2 = true) {
  const incubatorSchema = {
    hospital_id: {
      isInt: {
        errorMessage: 'Hospital ID must be an integer value',
      },
      toInt: true,
    },
    incubator_id: {
      optional: isOpt1,
      isInt: {
        errorMessage: 'Incubator ID must be an integer value',
      },
      toInt: true,
    },
    name: {
      optional: isOpt2,
      notEmpty: {
        errorMessage: 'Incubator name must be not empty',
      },
      isString: {
        errorMessage: 'Incubator name must be a string',
      },
      escape: true,
    },
    type: {
      optional: isOpt2,
      notEmpty: {
        errorMessage: 'Incubator type must be not empty',
      },
      isString: {
        errorMessage: 'Incubator type must be a string',
      },
      escape: true,
    },
    status: {
      optional: isOpt2,
      notEmpty: {
        errorMessage: 'Incubator type must be not empty',
      },
      isIn: {
        options: [['available', 'pending', 'reserved']],
        errorMessage: 'Incubator status not valid',
      },
    },
    rent_per_day: {
      optional: isOpt2,
      isFloat: {
        errorMessage: 'Incubator rent must be of the type double',
      },
      toFloat: true,
    },
  }

  return incubatorSchema;
}


export {
  getIncubatorSchema,
}
