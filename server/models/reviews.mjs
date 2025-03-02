import mongoose, { Schema } from mongoose
import userSubDoc from './subdocs/userSubDoc.mjs'



const reviewSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title for your review!']
    },
    stars: Number,
    body: {
         type: String, rquired: [true, 'Please enter a review body']
     },
    // Using the Extended reference pattern to have access to needed field in user
    user: userSubDoc,
    product_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a product_id']
    },
   
}, { timestamps: true })

mongoose.model('Reviews', reviewSchema)