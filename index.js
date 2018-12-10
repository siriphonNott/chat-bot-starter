var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var PORT = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send({status: 'ok'});
    console.log('Get /');
});

app.post('/webhook', (req, res) => {
    console.log('POST /webhook');
    console.log(req.body);
    res.send({status: '/webhook : ok'});
});

app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
});