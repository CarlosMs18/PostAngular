
const { Router } = require('express');
const { retornaImagen } = require('../controllers/uploads');

const router = Router();


router.get('/:tipo/:foto', retornaImagen );
module.exports = router;
