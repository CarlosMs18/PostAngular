const bcryptjs = require('bcryptjs')
const {generateJwt} = require('../helpers/generate-jwt.helper');
const User = require('../models/user.model');


const signUp = async(req, res) => {
    const {nombre , email , password} = req.body;


    try {
      const emailExiste = await User.findOne({email});

      if(emailExiste){
         return res.status(400).json({
              ok : false,
              msg : "El correo ingresado ya existe, intente con otro"
         })
      }


      const genSaltSync = bcryptjs.genSaltSync();
      const hashPassword = bcryptjs.hashSync(password, genSaltSync);



      const user = new User({
        nombre,
        email ,
        password : hashPassword
      });


      await user.save();

      const token = await generateJwt(user.id);

      res.status(201).json({
         ok: true,
         user,
         token
      })




    } catch (error) {
       return res.status(500).json({
           ok : false,
           msg : 'Internal Server Error'
       })
    }


}

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
      console.log('aca', req.body)
      if(!req.body){
        console.log('e')
        return res.json({
          ok : false,
          msg : 'vacio'
        })
      }

      const user = await User.findOne({email});
      console.log(user)
      if(!user){
        return res.status(401).json({
           ok : false,
           msg : "El email que acaba de ingresar no existe"
        })
      }
      const equalsPassword = bcryptjs.compareSync(password, user.password);

      if(!equalsPassword){
          return res.status(400).json({
           ok: false,
           msg : "El email y/o la contraseña son incorrectos"
        })
      }

      const token = await generateJwt(user.id);

      res.status(200).json({
        ok : true,
        user,
        token
      })

    } catch (error) {
      return res.status(500).json({
         ok : false,
         msg : "Internal Serve Error"
      })
    }


}


const renewToken = async(req, res) => {
    const uid = req.uid;

    const user = await User.findById(uid);

    const token = generateJwt(uid);

    res.json({
      ok : true,
      token,
      user
    })
}

module.exports = {
  signUp,
  login,
  renewToken
}
