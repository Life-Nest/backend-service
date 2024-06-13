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
  babyName: {
    notEmpty: {
      errorMessage: 'Name should be not empty',
    },
  isString: {
      errorMessage: 'Name should be a string',
    },
    escape: true,
  },
  babyAge: {
    isInt: {
      errorMessage: 'Age should be an integer value',
    },
    toInt: true,
  },
  babyGender: {
    notEmpty: {
      errorMessage: 'Gender should be not empty',
    },
    isIn: {
      options: [['male', 'female']],
      errorMessage: 'Gender not valid',
    },
  },
  babyWeight: {
    isFloat: {
      errorMessage: 'Weight should be a floating point number',
    },
    toFloat: true,
  },
  birthHospital: {
    notEmpty: {
      errorMessage: 'Hospital name should be not empty',
    },
    isString: {
      errorMessage: 'Hospital name should be a string',
    },
    escape: true,
  },
  birthDoctorName: {
    notEmpty: {
      errorMessage: 'Doctor name should be not empty',
    },
    isString: {
      errorMessage: 'Doctor name should be a string',
    },
    escape: true,
  },
  birthDoctorPhone: {
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
  incubatorId: {
    isInt: {
      errorMessage: 'Id should be an integer number',
    },
    toInt: true,
  },
  hospitalId: {
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

const reservationId = {
  reservationId: {
    isInt: {
      errorMessage: 'Id should be an integer number',
    },
    toInt: true,
  },
}

const parentId = {
  parentId: {
    isInt: {
      errorMessage: 'Id should be an integer number',
    },
    toInt: true,
  },
}


export {
  reservationCreate,
  reservationUpdate,
  reservationId,
  parentId
}
