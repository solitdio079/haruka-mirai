import mongoose, { Schema } from 'mongoose'

import userSubDoc from './subdocs/userSubDoc.mjs'
import Product from './products/products.mjs'
const cartSubDoc = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide a user_id'],
  },
  items: {
    type: Array,
    required: [true, 'Cart cannot be empty']
  },
  subtotal: {
    type: mongoose.Types.Decimal128,
    required: [true, 'The subtotal is required!']
  },
})
const addressSubDoc = new Schema({
  name: {
    type: String,
    required: [true, 'Please give that address a name'],
  },
  addressLines: {
    type: String,
    required: [true, 'Please enter the address lines'],
  },
  city: {
    type: String,
    required: [true, 'Please enter the city!'],
  },
  country: {
    type: String,
    required: [true, 'Please enter the country!'],
  },
  zipCode: {
    type: String,
    required: [true, 'Please enter the zipcode!'],
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide a user for this address!'],
  },
})





const orderSchema = new Schema({
  cart: {
    type: cartSubDoc,
    required: [true, 'Please provide a cart!'],
  },
  total: {
    type: mongoose.Decimal128,
    required: [true, 'Please provide a total price for the order!'],
  },
  status: {
    type: String,
    default: 'Order Received',
  },
  user: {
    type: userSubDoc,
    required: [true, 'The order needs a user']
   },
  payment: mongoose.Mixed,
  address: {
    type: addressSubDoc,
    required: [true, 'Please provide an address'],
  },
  shipping: {
    type: String,
    default: 'https://google.com/',
  },
}, {timestamps: true})

orderSchema.post("save", async function (doc) {
  const items = doc.cart.items
  items.forEach(async (item) => {
    const product = await Product.findById(item.id)
    product.qty -= Number(item.qty)
    product.qty = product.qty > 0 ? product.qty : 0
    await Product.findByIdAndUpdate(product._id, product)
  })
})

export default mongoose.model('Orders', orderSchema)