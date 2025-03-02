import mongoose, { Schema } from 'mongoose'

// Setting a discriminatory key for the inheritance pattern
const options = { discriminatoryKey: 'type', timestamps: true }


// The subdocument for category for the extended reference pattern
const categorySubDoc = new Schema({
    category_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the category id']
    },
    name: {
        type: String,
        required: [true, 'Please enter the category name!']
    }
})
// The subdocument for sales
const salesSubDoc = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a sales name!'],
  },
  sales_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide a sales id!'],
  },
  discount_rate: {
    type: mongoose.Decimal128,
    required: [true, 'Please provide a discount rate!'],
    },
    expiry_date: {
      type: Date
  }
})

const productSchema = new Schema({
    name: {
        type: String,
        requuired: [true, 'Please enter a name!']
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please enter a price for your product!']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description']
    },
    qty: {
        type: Number,
        required: [true, 'Please enter the total number of products that you got!']
    },
    images: {
        type: String,
        required: [true, 'No images provided!']
    },
    type: {
        type: String,
        default: 'Product'
    },
    category: categorySubDoc,
    additional_info: {
        type: String,
        default: 'No additional infos!'
    },
    rating: {
        numberOfReviews: {
            type: Number,
            default: 0
        },
        avgsScore: {
            type: mongoose.Decimal128,
            default: 0
        }
    },
    onSale: {
        type: salesSubDoc,
        default: null
       
    }
}, options)

productSchema.pre("find", async function () {
  const products = await this.model.aggregate([{
       $match: { onSale: {$ne: null}}
    }, {
       $match: {"onSale.expiry_date": {$lt: new Date(Date.now())}}
       }])
       
       products.forEach(async (product) => {
        product.onSale = null
        await this.model.findByIdAndUpdate(product._id, product)
    })
})

const Product = mongoose.model('Product', productSchema)

export default Product