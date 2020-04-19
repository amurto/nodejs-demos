var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const requestIp = require('request-ip');
app.use(requestIp.mw())

const { detect } = require('detect-browser');
const browser = detect();

const axios = require('axios');
 
app.get('/getip', function(req,res){
    const ip = req.clientIp;
    res.end(ip);
})

app.get('/getbrowser', function(req,res){
    if (browser) {
        res.end(browser.name + " " + browser.version + " " + browser.os);
    }
})

app.get('/displaysourcecode', function(req,res){
    const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
    axios(url)
      .then(response => {
        const html = response.data;
        console.log(html);
        res.end(html);
      })
      .catch(console.error);
})

app.listen(3000, function(){
    console.log("Working on port 3000");
})