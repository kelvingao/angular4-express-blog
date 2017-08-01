var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

messages = [{text: 'some text', owner: 'Tim'}, {text: 'other message', owner: 'Jane'}];
users = [{firstName: 'a', email: 'a', password: 'a', id: 0}];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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

api.get('/user/me', checkAuthenticated, (req, res) => {
    res.json(users[req.user]);
})

api.post('/user/me', checkAuthenticated, (req, res) => {
    var user = users[req.user];

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    
    res.json(user);
})

api.post('/messages', (req, res) => {
    console.log(req.body);
    messages.push(req.body);
    res.send(req.body).status(200);
});

auth.post('/login', (req, res) => {
    var user = users.find(user => req.body.firstName == user.firstName);

    if (!user) sendAuthError(res);

    if (user.password == req.body.password) {
        sendToken(user, res);
    } else
        sendAuthError(res);
})
auth.post('/register', (req, res) => {
    var index = users.push(req.body) - 1;

    var user = users[index];
    user.id = index;

    sendToken(user, res);

})

function sendAuthError(res) {
    return res.json({ success: false, message: 'username or password incorrect'});
}
function sendToken(user, res) {
    var token = jwt.sign(user.id, '123');
    res.json({firstName: user.firstName, token: token});
}

function checkAuthenticated(req, res, next) {
    if (!req.header('Authorization'))
        return res.status(401).send({message: 'Unauthorized requested. Missing authentication header'});

    var token = req.header('Authorization').split(' ')[1];

    var payload = jwt.decode(token, '123');
    if(!payload) return res.status(401).send({message: 'Unauthorized requested. Authentication header invalid'});

    req.user = payload;

    next();
}
app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);