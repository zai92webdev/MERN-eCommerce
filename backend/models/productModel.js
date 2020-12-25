const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
    name: { 
        type: String,
        required: true },
    rating: { 
        type: Number, 
        required: true },
    comment: { 
        type: String, 
        required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        },
    },
    {
    timestamps: true,
    }
)

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    img:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true,
        default: 0,
    },
    description:{
        type:String,
        required:true,
    },
    productCount: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [reviewSchema],
    reviewNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    rating:{
        type:Number,
        required:true,
        default: 0,
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('products',productSchema)