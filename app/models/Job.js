var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

Jobs = new mongoose.Schema({
	_employer: {type: mongoose.Schema.Types.ObjectId, ref: 'Employer'},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	address: {type: String, required: true, unique: false},
	available: {type: Boolean, required: true, unique: false},
	completion: {type: Boolean, required: true, unique: false},
	reference_status: {type: Boolean, required: false, unique: false},
	description:{
		summary: {type: String, required: false, unique: false},
		detailed:{type: Boolean, required: false, unique: false},
	},
	expiration:{type: Boolean, required: false, unique: false},
	title: {type: String, required: false, unique: false},
	payment: {type: Number, required: false, unique: false},
	review: {type: String, required: false, unique: false},
	loc: {
		type: [Number],
		index: '2d'
	},
}, {
	timestamps:true
});



