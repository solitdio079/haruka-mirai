import { Schema } from 'mongoose'
import Product from './products.mjs'
const options = { discriminatoryKey: 'type' }
const Furniture = Product.discriminator(
  'Furniture',
  new Schema({
    color: {
      type: String, 
      required: [true, 'Please enter the furniture color!']
    },
    material: {
      type: String,
      required: [true, 'Please enter the material of the furniture!']
    
    },
    width: {
      type: String,
      required: [true, 'Please provide the width of the furniture!']
    },
    length: {
      type: String,
      required: [true, 'Please provide the length of the furniture!']
    },
  }, options)
)

export default Furniture