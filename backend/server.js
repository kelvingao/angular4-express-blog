var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/angular4blog', { useMongoClient: true });

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

var api = require('./api/api.routes');
var auth = require('./auth/auth.routes');

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);