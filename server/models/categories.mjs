import mongoose,{ Schema } from 'mongoose'


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter ']
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        
    },
    image: {
        type: String
    }
})

categorySchema.post('findOneAndDelete', async function (doc) {
    await this.model.deleteMany({parent_id: doc._id})
    console.log('%s has been deleted', doc._id)
})

export default mongoose.model('Category', categorySchema)