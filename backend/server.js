var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

messages = [{text: 'some text', owner: 'Tim'}, {text: 'other message', owner: 'Jane'}];
users = [{firstName: 'a', email: 'a', password: 'a', id: 0}];

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

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);