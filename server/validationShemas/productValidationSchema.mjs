export default {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: 'The product name should not be empty',
    },
    isLength: {
      options: { min: 5 },
      errorMessage: 'The name must have at least 5 characters!',
    },
    escape: true,
  },
  price: {
    isFloat: {
      errorMessage: 'Make sure the price is a float or number!'
    },
    notEmpty: {
      errorMessage: 'Please enter a product price!',
    },
  },
  description: {
    trim: true,
    notEmpty: {
      errorMessage: 'Please enter a description for this product!',
    },
    isLength: {
      options: { min: 20 },
      errorMessage: 'Decription must be at least 20 characters long!',
    },
  },
  qty: {
    isFloat: {
      errorMessage: 'Quantity must be a number'
    },
    notEmpty: {
      errorMessage: 'Please enter the amount of products available!',
    },
    },
    category: {
        notEmpty: {
          errorMessage: 'Please enter a category'
      }
    }
}