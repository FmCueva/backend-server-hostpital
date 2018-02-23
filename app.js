// Requires(importación de librerias)
var express = require('express');
var mongoose = require('mongoose'); // referencio la libreria para la conexión a la bd


//

//Inicializar variables
var app= express();

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB',
    (err, res) => {
        if(err) throw err;

        console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
    });


// Creación de rutas (req = request, res = response )
// nomalmente no se usa next en solicitudes get, post, ...
// next se usa solo con midlework

app.get('/', (req, res, next) => {
    // ponder estatus de código de error
    res.status(403).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    }); 
});


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m','online');
});

