var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

var ExampleSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	create_at: {type: Date, default: new Date}
});

ExampleSchema.plugin(uniqueValidator);
mongoose.model('Example', ExampleSchema);