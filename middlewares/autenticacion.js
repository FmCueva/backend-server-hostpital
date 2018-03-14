var jwt = require('jsonwebtoken'); // usar la librería jsonwebtoken
var SEED = require('../config/config').SEED; // tomo la constante


/*************************************************** 
* Función para verificar  si el token es válido (leer el token del url, 
* procesarlo para ver si válido, y permitirle continuar al usuario )
*
* Params:
*   req: lo que viene en request
*   res: la respuesta que envía el server
*   next:
***************************************************/

exports.verificarToken = function (req, res, next)
{
    // toma el token enviado por request
    var token = req.query.token;

    // realiza la verificación del token
    jwt.verify( token, SEED, (err, decoded) => {
        
        //Si existe un error el token no está autorizado
        if( err ){
            return  res.status(401).json({
                ok: false,
                mensaje: 'token inocorrecto !',
                errors: err            
            }); 
        }

        // extraigo el usuario del decoded para tener en request la información del usuario
        // que hizo la solicitud para ser usada en cualquier lugar
        req.usuario = decoded.usuario;

        // res.status(200).json({
        //    ok: true,
        //    decoded: decoded // imprime el contenido del decoded
        // });
        
        // Le indica que puede continuar con las siguientes 
        // funciones que están después del método
        next();
    });
}
