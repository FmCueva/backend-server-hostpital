//==================================================
// Requires(importación de librerias)
//==================================================
var express = require('express');
var mongoose = require('mongoose'); // referencio la libreria para la conexión a la bd
var bodyParser = require('body-parser');

//==================================================
// Inicializar variables
//==================================================
var app = express();
// Configurar body-parser  application/x-www-form-urlencoded para que se enjecuten siempre
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//==================================================
// Importo las rutas
//==================================================
var appRoutes = require('./routes/app');
var usuarioRoutes = require ('./routes/usuario');
var loginRoutes = require ('./routes/login');

//==================================================
// Conexión a la base de datos
//==================================================
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB',
    (err, res) => {
        if(err) throw err;

        console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
    });

//==================================================
// uso de las rutas ()
//==================================================
app.use('/usuario', usuarioRoutes); //path usuario para usar las peticiones
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//==================================================
//Escuchar peticiones
//==================================================
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m','online');
});

