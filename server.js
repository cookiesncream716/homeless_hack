var express = require('express');
var path = require('path');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var jwtSecret = 'aasjidfjiodsjfiosajfs';
var expressJwt = require('express-jwt');

app.use(express.static(path.join(__dirname, './public')));
// for css
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressJwt({ secret: jwtSecret })
          .unless({ path: ['/', '/register', '/acceptJob', '/resume','/login', '/userLogin', '/userRegister', '/jobs', /^\/jobs\/.*/, /^\/completedJobs\/.*/, /^\/jobsForUser\/.*/] }));

require('./app/config/mongoose.js');
require('./app/config/routes.js')(app);

app.listen(8000, function(){
	console.log('Listening for XXXXX on 8000');
});