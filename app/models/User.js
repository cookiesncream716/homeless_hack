<<<<<<< HEAD
=======

>>>>>>> b43fee91727b205d9f373b33045dc419c6899cfc
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: false},
	username: {type: String, required: true, unique: true},
	city: {type: String, required: true, unique: false},
	zipCode: {type: String, required: false, unique: false},
	password: {type: String, required: false, unique: false}
}, {
	timestamps:true
});

mongoose.model('User', UserSchema);

