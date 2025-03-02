import mongoose,{ Schema } from "mongoose"
export default new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide a user id!'],
  },
  fullName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email!'],
  },
  picture: {
    type: String,
  },
  phone: {
    type: String
  }
})
