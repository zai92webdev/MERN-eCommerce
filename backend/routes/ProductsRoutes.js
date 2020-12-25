const router = require('express').Router()
const productController = require('../controllers/productCtrl')
const authAdmin = require('../middleware/authAdmin')
const auth = require('../middleware/auth')



router.get('/all_product', productController.getAllProduct )

router.get('/product_info/:id', productController.getSingleProduct )

router.post('/product_review',auth, productController.createProductReview)




// for Admin
router.post('/create',auth,authAdmin, productController.createProduct)

router.patch('/update/:id',auth,authAdmin, productController.updateProduct)

router.delete('/delete/:id',auth,authAdmin, productController.deleteProduct)


module.exports = router