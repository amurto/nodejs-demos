var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/table',function(req,res){
  var n = req.body.number;
  var opt = req.body.option;
  var flag = 1;
  if (opt == 1) {
    res.end(n*1 + " " + n*2 + " " + n*3);
  } else if (opt == 2) {
      for (i = 2; i <= n - 1; i++) {
                if (n % i == 0) { 
                    flag = 0; 
                    break; 
                } 
              }
            if (flag == 1) 
                res.end("The number is prime"); 
            else
                res.end("The number is non-prime"); 
  } else if (opt == 3) {
      var rem, temp, final = 0;
      temp = n;
      while(n>0)
      {
        rem = n%10;
        n = parseInt(n/10);
        final = final*10+rem;
      }
      if(final==temp)
        res.end("The number is palindrome");
      else
        res.end("The number is not a palindrome");
  } else if (opt == 4) {
      var i, fact;
      fact=1;
      for(i=1; i<=n; i++)  
      {
        fact= fact*i;
      }
      res.end("The factorial of the number is " + fact);
  } else if (opt == 5) {
      var a = 0, b = 1, f = 1;
      for(var i = 2; i <= n; i++) {
          f = a + b;
          a = b;
          b = f;
      }
      res.end("The fibonacci of " + n + " terms is " + f);
  } else {
    res.end("You havent selected an option.")
  }
})

app.listen(3000,function(){
    console.log("Working on port 3000");
});