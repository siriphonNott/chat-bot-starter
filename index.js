var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: 'Z4zN+4RVlu26nezA/xMcyJCZ7sSx79FZ2bD+1tBMS3APfOf0kUudzCuqcBPXdMa9zoocYXkWzloKU1SJTFAuC26PHu2Hbt6tbx2rmJop2cnsxTd1qpiLpZNh1vPUx51xRYJ9ypvC6rQ9HcSEYweIUAdB04t89/1O/w1cDnyilFU='
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
        console.log('==> req.body:');
        console.log(req.body);
        let events = req.body.events[0];
        let replyToken = events.replyToken;
        let type = events.type;
        console.log('==> events:');
        console.log(events);
        switch (type) {
            case 'message':
                let message = events.message.text;
                let questionList = ['ขอเอกสาร', 'เอกสาร', 'doc', 'document'];
                let checkInQuestion = (str) => {
                    return  questionList.find((element)=>{
                        return str.includes(element);
                    });
                }
                console.log(`==> checkInQuestion(${message}):`+checkInQuestion(message));
                
                if(checkInQuestion(message)) {
                    console.log('==> Have in question');
                    message = [
                        // {
                        //     type: 'text',
                        //     text: `สวัสดีครับ NottDev Training ยินดีย้อนรับ\n\nรายการที่จำเป็นสำหรับการเรียน มีดังนี้`
                        // },
                        // {
                        //     type: 'text',
                        //     text: `Line@: https://at.line.me/th/\nLine Developers: https://developers.line.biz/en/`
                        
                        // },
                        // {
                        //     type: 'text',
                        //     text: `GitHub: https://github.com/`
                        
                        // },
                        {
                            type: 'text',
                            text: "Heroku: https://www.heroku.com/"
                        
                        },
                        {
                            type: "sticker",
                            packageId: "106",
                            stickerId: "1"
                        }
                    ];
                    message = {
                        type: 'text',
                        text: "Heroku: https://www.heroku.com/"
                    }
                } else {
                    message = {
                        type: 'text',
                        text: 'ไม่เข้าใจอ่ะ งง ลองพิมพ์ใหม่สิครับ >.< '
                    }
                }
                console.log('==> message reply:');
                console.log(message);
                
                client.replyMessage(replyToken, message)
                .then(() => {console.log('Reply is successfully!');})
                .catch((err) => {console.log('Error: '+err);});
                
                break;
            default:
                break;
        }

    } else {
        console.log('No data');
    }
});

app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
});