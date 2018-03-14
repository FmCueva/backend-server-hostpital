var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // usar la librería jsonwebtoken
var SEED = require('../config/config').SEED; // tomo la constante
var app = express();

var Usuario = require('../models/usuario');


// Crear metodo del login
app.post('/', (req, res) =>{

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {

        //verifica si hay un error
        if(err) {
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario!',
                errors: err            
            }); 
        }
        
        // Verifica si existe un usuario con los parámetros indicados
        if( !usuarioDB ){
            return  res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email !',
                errors: err            
            }); 
        }

        //Verificar si la contraseña del usuario es correcta
        if( !bcrypt.compareSync(body.password, usuarioDB.password ) ){
            return  res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password !',
                errors: err            
            }); 
        }

        // quito el password del usuario
        usuarioDB.password=':)';

        // Crear un token
        // parámetros: (data del token (payload), 
        //          semilla (seed) o el código secreto,
        //          fecha expiración del token (4h))
        var token = jwt.sign( {usuario: usuarioDB}, SEED, {expiresIn: 144000 } );


        // si se actualizo el usuario
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    });
    
});

module.exports = app;