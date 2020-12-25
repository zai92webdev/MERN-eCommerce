const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const userController = require('../controllers/userCtrl')

router.post('/register', userController.register)

router.post('/login', userController.login)

// router.post('/tokenIsValid', userController.isValid)

router.get('/info',auth, userController.get)

router.get('/all_info',auth, authAdmin, userController.getAll)

router.get('/logout', userController.logout)

router.patch('/update', auth, userController.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userController.updateUserRole)

router.delete('/delete/:id', auth, authAdmin, userController.deleteUser)


module.exports = router
