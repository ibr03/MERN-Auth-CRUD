const { Signup, Login } = require('../Controllers/AuthController')
const router = require('express').Router()
const { userVerification } = require('../Middlewares/AuthMiddleware');

// singup and login routes
router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router;