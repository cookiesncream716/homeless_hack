var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./app/config/mongoose.js');
require('./app/config/routes.js')(app);

app.use(express.static(path.join(__dirname, './public')));
// for css

app.listen(8000, function(){
	console.log('Listening for XXXXX on 8000');
});