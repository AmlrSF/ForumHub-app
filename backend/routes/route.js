const express = require('express');
const router = express.Router();
const {
    register,
    Login,
    getUser
} = require('../controllers/index.js')
const {check} = require('express-validator');
const {authorize} = require('../middleware/index.js')

router.route('/register').post([
    check('email','please enter a valid email').isEmail(),
    check('password','please provide a password that is greater than 5 caracters').isLength({min:6}),
    check('username','please provide a valid username that is greater than a 6 carcaters').isLength({min:6})
],register)

router.route('/Login').post(Login)
router.route('/user').post(authorize,getUser);

module.exports = router;