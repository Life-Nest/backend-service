const searchParams = {
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
  babyCase: {
    optional: true,
    isIn: {
      options: [['Oxygen defficiency', 'Early birth', 'Jaudnice']],
      errorMessage: 'Not available case option. \
Choose between: Oxygen defficiency, Early birth, Jaudnice',
    },
  },
  city: {
    optional: true,
    isString: {
      errorMessage: 'City must be a string',
    },
    escape: true,
  },
  page: {
    isInt: {
      errorMessage: 'Page number must be an integer',
    },
    toInt: true,
  },
}

export {
  searchParams
}
