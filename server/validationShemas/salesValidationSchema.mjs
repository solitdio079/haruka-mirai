export default {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: 'The sales name should not be empty',
    },
    isLength: {
      options: { min: 5 },
      errorMessage: 'The name must have at least 5 characters!',
    },
    escape: true,
  },
  discount_rate: {
    isFloat: {
      errorMessage: 'Discount rate must be a number',
    },
    notEmpty: {
      errorMessage: 'Please provide a discount rate',
    },
  },
  expires: {
    trim: true,
      isISO8601: {
        errorMessage: 'Please provide a valid date format'
    },
    notEmpty: {
      errorMessage: 'Please provide a discount rate',
      },
    toDate: true
  },
}