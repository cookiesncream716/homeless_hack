var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var EmployerSchema = new mongoose.Schema({

	name: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	city: {type: String, required: true, unique: false},
	zipCode: {type: String, required: false, unique: false},
	password: {type: String, required: false, unique: false},
	loc: {
		type: [Number],
		 index: '2d'
	},
	street: {type: String, required: true, unique: false},
}, {
	timestamps:true

});

mongoose.model('Employer', EmployerSchema);

