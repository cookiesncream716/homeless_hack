var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var EmployerSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true}, 
	password: {type: String, required: true}
})


// var EmployerSchema = new mongoose.Schema({
// 	name: {type: String, required: true, unique: true},
// 	password: {type: String, required: false, unique: false},
// 	loc: {
// 		type: [Number],
// 		 index: '2d'
// 	},
// 	email: {type: String, required: true}
// 	street: {type: String, required: true, unique: false},
// 	city: {type: String, required: true, unique: false},
// 	zipcode: {type: Number, required: true, unique: false},

// }, {
// 	timestamps:true
// });
mongoose.model('Employer', EmployerSchema); 
