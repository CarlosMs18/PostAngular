const jwt = require('jsonwebtoken');

const  generateJwt = async(uid ) =>{
  return new Promise( ( resolve, reject ) => {

    const payload = {
        uid,
    };


    jwt.sign( payload, "privateSecr3tK3ey", {
        expiresIn: '12h'
    }, ( err, token ) => {

        if ( err ) {
            console.log(err);
            reject('No se pudo generar el JWT');
        } else {
            resolve( token );
        }

    });

});
}



module.exports ={
  generateJwt
}

