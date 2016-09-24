var mongoose = require('Mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	city: {type: String, required: true, unique: false},
	zipCode: {type: String, required: false, unique: false},
	password: {type: String, required: false, unique: false}
}, {
	timestamps:true
});

mongoose.model('User', UserSchema);
