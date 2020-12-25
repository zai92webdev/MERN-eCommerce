const mongoose = require('mongoose')


const orderItem= new mongoose.Schema({
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',}
})

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    shippingAddress: {
        address : {
            type: String,
            required: true,
        },
        city : {
            type: String,
            required: true,
        },
        postalCode : {
            type: String,
            required: true,
        },
        country :{
            type: String,
            required: true,
        }
    },
    orderItems : [orderItem],
    paymentMethod : {
        type: String,
        required: true
    },
    itemsPrice : {
        type: Number,
        required: true,
        default: 0.0
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('orders', orderSchema)