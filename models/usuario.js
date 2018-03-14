var mongoose = require('mongoose');

//importo el pluging para personalizar los mensajes de validación de campos únicos 
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

// defino las propiedades del esquema que se asocia directamente con la colección usuarios 
// en la base de datos
var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El email es obligatorio'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: { type: String, required:false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

//asocio el esquema con el pluging, el {PATH} verifica cualquier propiedad que tenga el atributo unique
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único'});

// Exporto el esquema para que pueda ser usado desde otros objetos
module.exports = mongoose.model('Usuario', usuarioSchema );

