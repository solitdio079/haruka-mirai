import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  email: String,
  fullName: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default:
      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  },
  phone: {
    type: String
  }
})
export default mongoose.model('User', userSchema)


