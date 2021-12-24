const {Router} = require('express');
const requireAuth = require('../middleware/authMiddleware');
const productController = require('../controllers/productController')
const router = Router();
const authController = require('../controllers/authControllers');
router.post('/login', authController.auth_login_post);
router.post('/register',authController.auth_signup_post);
router.get('/userdata',requireAuth,authController.auth_USER_GET)
router.put('/cart/additem',productController.product_put);
router.put('/cart/removeitem',productController.product_put_del)
router.put('/cart/changequant',productController.product_put_changequant)
module.exports = router;