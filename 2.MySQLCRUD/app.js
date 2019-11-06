var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// // Create DB
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE nodemysql';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created...');
//     });
// });

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
  });

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), DOB  DATE, contactno VARCHAR(255), emailid VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created');
    });
});

// Insert user
app.post('/adduser', (req, res) => {
    let user = {name: req.body.username, DOB: req.body.date, contactno: req.body.contactno, emailid: req.body.emailid};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, user, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User added');
    });
});


// Select posts
app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Users fetched');
    });
});

// Update post
app.get('/updateuser/:id', (req,res) => {
    let id = req.params.id;
    let sql = `UPDATE users SET name = 'John' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users updated');
    });
})

// Delete post
app.get('/deleteuser/:id', (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User deleted');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});