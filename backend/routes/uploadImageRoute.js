const router = require('express').Router()
const uploadImg = require('../middleware/uploadImage')
const uploadImgController = require('../controllers/uploadImageCtrl')

router.post('/upload_avatar', uploadImg, uploadImgController.uploadAvatar)

router.post('/upload_product', uploadImg, uploadImgController.uploadProduct)


module.exports = router