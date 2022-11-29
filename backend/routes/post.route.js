const {Router} = require('express');
const { getPosts, creacionPost, updatedPost, deletePost, getPost } = require('../controllers/post.controller');
const { verificarToken } = require('../middlewares/verificar-jwt.middleware');

const router = Router()

router.get("",[verificarToken],getPosts);


router.get("/:id", getPost);

router.post("", [verificarToken], creacionPost);


router.put("/:id", [verificarToken],updatedPost);


router.delete("/:id",[verificarToken], deletePost);


module.exports = router;
