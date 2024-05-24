const searchParams = {
  longitude: {
    isFloat: {
      errorMessage: 'Longitude must be of the type double',
    },
    toFloat: true,
  },
  latitude: {
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
