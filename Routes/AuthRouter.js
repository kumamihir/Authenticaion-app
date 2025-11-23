const { signup, login } = require('../Controller/Authcontroller');
const { signupvalidation, loginvalidation } = require('../Middleware/AuthMiddleware');

const router = require('express').Router();
router.post('/login',loginvalidation,login)

router.post('/signup',signupvalidation,signup)

module.exports = router