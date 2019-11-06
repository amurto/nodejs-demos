var express = require('express')
var multer  = require('multer')
var path = require('path')
var app = express()

var Storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage: Storage
  }).single('file');
 
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/upload', function (req, res, next) {
    upload(req,res,function(err) {
        if(err) {
            return res.end("Unsuccessful");
        }
        res.end("Successful");
    });
})

app.listen(3000,function(){
    console.log("Working on port 3000");
});

