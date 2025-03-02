import mongoose, { Schema } from 'mongoose'
import userSubDoc from './subdocs/userSubDoc.mjs'

const addressSchema = new Schema({
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
    required: [true, 'Please provide a user for this address!']
  }
})

export default mongoose.model('Address', addressSchema)