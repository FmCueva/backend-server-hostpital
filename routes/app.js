//importo las librerias 
var express = require('express');

var app = express();

// Creación de rutas (req = request, res = response )
// nomalmente no se usa next en solicitudes get, post, ...
// next se usa solo con midlework

app.get('/', (req, res, next) => {
    // ponder estatus de código de error
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    }); 
});

// exporto el app que contiene las rutas para que se use desde otro objeto
module.exports = app;