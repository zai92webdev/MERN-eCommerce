const router = require('express').Router()

const orderController = require('../controllers/orderCtrl')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')



router.get('/orderlist',auth, authAdmin , orderController.getListOrder)

router.get('/myorder',auth , orderController.getMyOrder)

router.get('/:id',auth, orderController.getOrder)


router.post('/',auth , orderController.createOrder)




module.exports = router