import { param, body } from 'express-validator';

const hospitalId = {
  hospital_id: {
    isInt: {
      errorMessage: 'Hospital ID must be an integer value',
    },
    toInt: true,
  },
}

const incubatorId = {
  incubator_id: {
    isInt: {
      errorMessage: 'Incubator ID must be an integer value',
    },
    toInt: true,
  },
}

const incubatorSchema = {
  name: {
    notEmpty: {
      errorMessage: 'Incubator name must be not empty',
    },
    isString: {
      errorMessage: 'Incubator name must be a string',
    },
    escape: true,
  },
  type: {
    notEmpty: {
      errorMessage: 'Incubator type must be not empty',
    },
    isString: {
      errorMessage: 'Incubator type must be a string',
    },
    escape: true,
  },
  status: {
    notEmpty: {
      errorMessage: 'Incubator type must be not empty',
    },
    isIn: {
      options: [['available', 'pending', 'reserved']],
      errorMessage: 'Incubator status not valid',
    },
  },
  rent_per_day: {
    isFloat: {
      errorMessage: 'Incubator rent must be of the type double',
    },
    toFloat: true,
  },
}

const incubatorSearch = {
  longitude: {
    optional: true,
    isFloat: {
      errorMessage: 'Longitude must be of the type double',
    },
    toFloat: true,
  },
  latitude: {
    optional: true,
    isFloat: {
      errorMessage: 'Latitude must be of the type double',
    },
    toFloat: true,
  },
  city: {
    optional: true,
    isString: {
      errorMessage: 'City must be a string',
    },
    escape: true,
  },
}


export {
  hospitalId,
  incubatorId,
  incubatorSchema,
  incubatorSearch,
}
