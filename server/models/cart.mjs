import mongoose, { Schema } from 'mongoose'

const cartShema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "Please provide a user_id"]
    },
    items: {
        type: Array,
        default: []
    },
    subtotal: {
        type: mongoose.Types.Decimal128,
        default: 0.00
    }
})


export default mongoose.model('Cart', cartShema)