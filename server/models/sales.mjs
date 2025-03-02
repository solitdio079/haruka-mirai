import mongoose, { Schema } from 'mongoose'

const salesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the sales name!']
    },
    discount_rate: {
        type: mongoose.Decimal128,
        required: [true, 'Please provide a discount rate'],
    },
    image: {
        type: String,
        required: [true, 'Please provide a sales image']
    },
    expires: {
        type: Date,
        required: [true, 'Please provide an expiry date!']
    }
}, { timestamps: true })

export default mongoose.model('Sales', salesSchema)