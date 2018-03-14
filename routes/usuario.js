//importo las librerias 
var express = require('express');
var bcrypt = require('bcryptjs'); // librería para encriptar cadenas
var app = express();

// verifica si el token es válido
var autentication = require('../middlewares/autenticacion');


//Permite usar el modelo y usuarios y los métodos que tiene el esquema de usuarios
var Usuario = require('../models/usuario');

/*************************************************** 
* RECUPERA LOS USUARIOS
****************************************************/
app.get('/', ( req, res, next ) => {

    console.log('Entra get');
    //Busca y lita todos los usuarios 
    Usuario.find({},'nombre email img role')
        .exec(
            (err, usuarios) => {

            console.log('imprime');

            // si existe un error, envía el error como respuesta
            if(err) {
                return  res.status(500).json({
                    ok: false,
                    mensaje: 'Error al recuperar usuarios desde la base de datos!',
                    errors: err            
                }); 
            }
        
            console.log('usuarios: ',usuarios);
            // si se ejecuta correctamente, retorno un true y el arreglo de usuarios 
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });

    });//Método exec 

    
});// fin get


/*************************************************** 
* CREAR UN NUEVO USUARIO
****************************************************/

app.post('/', autentication.verificarToken,  (req, res) => {

    // funciona si y solo si se tiene el "body-parser",
    // para extraer el body enviado desde el browser
    var body = req.body;

    // creamos un objeto usuario para enviarlo a la base de datos
    var usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            img: body.img,
            role: body.role
    });


    //
    usuario.save((err, usuarioGuardado) => {
        // si existe un error, envía el error como respuesta
        if(err) {
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al grabar usuarios en la base de datos!',
                errors: err            
            }); 
        }

        // si se ejecuta correctamente, retorno un true y el arreglo de usuarios 
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario    
        });
        
    });

    

}); // fin post crear



/*************************************************** 
* MODIFICAR UN NUEVO USUARIO
* usar put o patch
* '/:id': es un recurso obligatorio para la aplicación
****************************************************/
app.put('/:id', autentication.verificarToken,  (req, res) => {

    // tomo el id del url que envía el request(req)
    var id = req.params.id;
    var body = req.body;

    // verificar si existe un usuario con ese id
    Usuario.findById(id, (err, usuario)=> {
        // si existe un error, envía el error como respuesta
        if(err) {
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario!',
                errors: {message: 'No existe un usuario con ese ID'}            
            }); 
        }

        // si el usuario es nulo
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: err
            });
        }
        // Si encontro el usuario ya se puede actualizar el usuario
        usuario.nombre = body.nombre; 
        usuario.email = body.email;
        usuario.role = body.role;
        // usuario.password = bcrypt.hashSync(body.password, 10); // encripto el password

        usuario.save((err, usuarioGuardado) => {
             // si existe un error, envía el error como respuesta
            if(err) {
                return  res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario!',
                    errors: err           
                }); 
            }

            //oculto el password
            usuarioGuardado.password = ':)';

            // si se actualizo el usuario
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });

    });

     
});

/*************************************************** 
* ELIMINAR UN NUEVO USUARIO
* usar put o patch
* '/:id': es un recurso obligatorio para la aplicación
****************************************************/
app.delete('/:id', autentication.verificarToken,  (req, res) => {

    // tomo el id del url que envía el request(req)
    var id = req.params.id;

    // verificar si existe un usuario con ese id
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=> {
        // si existe un error, envía el error como respuesta
        if(err) {
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al borrrar usuario!',
                errors:  err            
            }); 
        }

        if( !usuarioBorrado ) {
            return  res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con el id indicado!',
                errors:  {message : 'No existe un usuario con el id indicado!'}            
            }); 
        }

         // si se actualizo el usuario
         res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

     
});
// exporto el app que contiene las rutas para que se use desde otro objeto
module.exports = app;