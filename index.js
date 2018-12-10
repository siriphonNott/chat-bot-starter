var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: 'FDY1JdEITEcFrbjgqdukNhM4/GxENlfiQEjvv8XBiUz829hhLNcOV9l2Elm8zidqhgiHKvogmp/jh1PKh3vLMmn8s5Evf6LChB93r1agMcg0qJh3Q1nb3SVeaJjY0fK7hDuuYjGr6Nb1fgEJdpV1xwdB04t89/1O/w1cDnyilFU='
});

const message = {
  type: 'text',
  text: 'Hello World!'
};

var PORT = process.env.PORT || 4000;

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
    if(Object.keys(req.body).length !== 0) {
        let events = req.body.events[0];
        let replyToken = events.replyToken;

        const message = [
            {
                type: 'text',
                text: 'Hello World!'
            },
            {
                type: 'text',
                text: 'https://devdocs.line.me/files/sticker_list.pdf'
            },
            {
                type: "sticker",
                packageId: "1",
                stickerId: "1"
            }
        ];

        client.replyMessage(replyToken, message)
        .then(() => {
            console.log('Reply is successfully!');
        })
        .catch((err) => {
            console.log('Error: '+err);
        });
    } else {
        console.log('No data');
    }
});

app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
});