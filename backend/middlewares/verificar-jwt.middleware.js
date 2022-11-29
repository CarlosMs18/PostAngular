const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No se ha provisto de ningun token en la peticion",
      });
    }

    try {
    const { uid } = jwt.verify(token, "privateSecr3tK3ey");
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(500).json({
      ok : false,
      msg : 'Internal Server Error'
    })
  }

};

module.exports = {
  verificarToken,
};
