const Order = require('../models/orderModel')

const orderController =  {
    createOrder: async(req,res) => {
        try {
            const { cartShippingAddress,cartItems,cartPaymentMethod,cartTotalPrice } = req.body

            if(cartItems && cartItems.length === 0) 
            return res.status(400).json({msg:'No Order Items'})

            const order = new Order({
                user: req.user,
                orderItems: cartItems,
                shippingAddress: cartShippingAddress,
                paymentMethod : cartPaymentMethod,
                itemsPrice: cartTotalPrice
            })
            const CreateOrder = await order.save()
            
            res.status(201).json(CreateOrder)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getMyOrder: async(req, res) => {
        try {

            const orders = await Order.find({user:req.user}).populate('user', 'username email')

            res.status(200).json(orders)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


        getListOrder: async(req, res) => {
        try {

            const orders = await Order.find({}).populate('user', '_id username')

            res.status(200).json(orders)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    getOrder: async(req, res) => {
        try {
            const orderDetails = await Order.findById(req.params.id).populate('user', 'username email')

            res.status(200).json(orderDetails)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },




}


module.exports = orderController