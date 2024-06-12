const reservationCreate = {
  status: {
    notEmpty: {
      errorMessage: 'Reservation status should be not empty',
    },
    isIn: {
      options: [['confirmed', 'pending', 'cancelled']],
      errorMessage: 'Reservation status is not valid',
    },
  },
  baby_name: {
    notEmpty: {
      errorMessage: 'Name should be not empty',
    },
  isString: {
      errorMessage: 'Name should be a string',
    },
    escape: true,
  },
  baby_age: {
    isInt: {
      errorMessage: 'Age should be an integer value',
    },
    toInt: true,
  },
  baby_gender: {
    notEmpty: {
      errorMessage: 'Gender should be not empty',
    },
    isIn: {
      options: [['male', 'female']],
      errorMessage: 'Gender not valid',
    },
  },
  baby_weight: {
    isFloat: {
      errorMessage: 'Weight should be a floating point number',
    },
    toFloat: true,
  },
  birth_hospital: {
    notEmpty: {
      errorMessage: 'Hospital name should be not empty',
    },
    isString: {
      errorMessage: 'Hospital name should be a string',
    },
    escape: true,
  },
  birth_doctor_name: {
    notEmpty: {
      errorMessage: 'Doctor name should be not empty',
    },
    isString: {
      errorMessage: 'Doctor name should be a string',
    },
    escape: true,
  },
  birth_doctor_phone: {
    notEmpty: {
      errorMessage: 'Doctor phone should be not empty',
    },
    isString: {
      errorMessage: 'Doctor phone should be a string',
    },
    isMobilePhone: {
      errorMessage: 'Invalid phone number',
    },
  },
  incubator_id: {
    isInt: {
      errorMessage: 'Id should be an integer number',
    },
    toInt: true,
  },
}

const reservationUpdate = structuredClone(reservationCreate);
Object.keys(reservationUpdate).forEach(key => {
  reservationUpdate[key].optional = true;
});

const userId = {
  userId: {
    isInt: {
      errorMessage: 'Id should be an integer number',
    },
    toInt: true,
  },
}


export {
  reservationCreate,
  reservationUpdate,
  userId
}
