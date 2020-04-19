var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/getday', (req,res) => {
    var d = req.body.date;
    var birthday = new Date(d);
    var day1 = birthday.getDay();
    // Using If-else print Sunday - Saturday : 0 - 6
    res.end(day1)
})

app.listen(3000, () => {
    console.log("Connected to port 3000");
})