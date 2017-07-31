var express = require('express');
var app = express();

var bodyParser = require('body-parser');

messages = [{text: 'some text', owner: 'Tim'}, {text: 'other message', owner: 'Jane'}];
users = [];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

var api = express.Router();
var auth = express.Router();


api.get('/messages', (req, res) => {
    res.json(messages);
});

api.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    var result = messages.filter( messages => messages.owner == user );
    res.json(result);
});

api.post('/messages', (req, res) => {
    console.log(req.body);
    messages.push(req.body);
    res.send(req.body).status(200);
});

auth.post('/register', (req, res) => {
    console.log(req.body);
    users.push(req.body);
})

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);