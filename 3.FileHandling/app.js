var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs'); 
app.use(bodyParser.urlencoded({ extended: false }));    
app.use(bodyParser.json());

app.get('/read',function(req,res){
    fs.readFile('demo.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
});

app.get('/open',function(req,res){
    fs.open('file2.txt', 'w', function (err, file) {
        if (err) throw err;
        res.end("Saved");
      });
});

app.get('/write',function(req,res){
    fs.writeFile('file3.txt', 'This is my text', function (err) {
        if (err) throw err;
        res.end("Replaced");
      });
});

app.get('/append',function(req,res){
    fs.appendFile('textfile.txt', 'Hello content!', function (err) {
        if (err) throw err;
        res.end("Content Saved");
      });
});

app.get('/delete',function(req,res){
    fs.unlink('file2.txt', function (err) {
        if (err) throw err;
        res.end("File Deleted");
    });
});

app.listen(3000,function() {
    console.log("Working on port 3000");
});