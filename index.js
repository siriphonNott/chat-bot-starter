const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
    res.send({status: '/webhook : ok'});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});