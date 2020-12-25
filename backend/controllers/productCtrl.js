const Products = require('../models/productModel')

const productController = {
    getAllProduct: async(req,res) => {
        try {
            const products = await Products.find()

            res.json(products)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getSingleProduct: async(req,res) => {
        try {
            const product = await Products.findById(req.params.id)

            res.json(product)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    createProductReview: async(req,res) => {
        try {
            const { rating ,comment, username,id} = req.body


            const product = await Products.findById(id)


            if(product) {
                const alreadyReviewed = product.reviews.find( res => res.user.toString() === req.user.toString() )

                if(alreadyReviewed) {
                    return res.status(400).json({msg:'product already reviewed'})
                }

                const review = {
                name : username,
                rating: Number(rating),
                comment,
                user: req.user
                }


                product.reviews.push(review)

                product.reviewNumber = product.reviews.length
    
                product.rating =  product.reviews.reduce((accumulator, item) => item.rating + accumulator, 0) / product.reviews.length 

                await product.save()

                res.status(201).json({msg: 'Review added'})

            }

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createProduct: async(req,res) => {

        try {
            const product = new Products({
            name: 'Sample name',
            price: 0,
            user: req.user,
            img: 'https://res.cloudinary.com/djt9vokjn/image/upload/v1607347261/Default%20Icon%20Image/wuy3pa1j1w1mhbxxzrgh.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            productCount: 0,
            reviewNumber: 0,
            description: 'Sample description',
        })

        const productSaved = await product.save()

        res.json({
            product: {
                id: productSaved._id
            },
            msg: 'product create success'
        })  
        } catch (err) {
        
            return res.status(500).json({msg: err.message})
        }
    },

    updateProduct: async(req,res) => {
        try {
            const { name,price,brand,img,productCount,category,description } = req.body

            const product = await Products.findByIdAndUpdate(req.params.id, {name,price,brand,img,productCount,category,description} ,{new: true} )

            res.json({msg: 'updated success', id: req.params.id, product})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteProduct: async(req,res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)   
            
            res.json({msg: 'Deleted success', id: req.params.id})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

}

module.exports = productController