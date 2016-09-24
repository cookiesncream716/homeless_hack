var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var JobSchema = new mongoose.Schema({
	_employer: {type: mongoose.Schema.Types.ObjectId, ref: 'Employer'},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	city: {type: String, required: true, unique: false},
	street: {type: String, required: true, unique: false},
	zipcode: {type: String, required: true, unique: false},
	available: {type: Boolean, required: true, unique: false},
	completed: {type: Boolean, required: true, unique: false},
	employed: {type: Boolean, required: true, unique: false},
	reference_status: {type: Boolean, required: false, unique: false},
	description: {type: String, required: false, unique: false},
	expiration:{type: Date, required: false, unique: false},
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


mongoose.model('Job', JobSchema);

