const {Router} = require('express');
const {signUp, login, renewToken} = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/verificar-jwt.middleware');

const router = Router();


router.post("/signup",signUp);

router.post("/login",login);

router.post("/renew", [verificarToken], renewToken)
module.exports = router;
