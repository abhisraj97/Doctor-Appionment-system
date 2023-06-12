const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userCtrl.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

//router object
const router = express.Router()


//routes
router.post('/login', loginController)


router.route('/register').post(registerController)

//auth post
router.route('/getUserData',authMiddleware).post(authController);


module.exports = router;