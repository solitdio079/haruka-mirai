import { Schema } from 'mongoose'
import Product from './products.mjs'
const options = { discriminatoryKey: 'type' }
const Clothing = Product.discriminator(
  'Clothing',
  new Schema(
    {
      size: {
        type: String,
        required: [true, 'Please provide the size of the clothing']
      },
      color: {
        type: String,
        required: [true, 'Please provide the color of the clothing']
      },
    },
    options
  )
)

export default Clothing
