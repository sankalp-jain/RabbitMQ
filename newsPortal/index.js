var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer();
var app = express();

var sendServer = require('C:\\Users\\sanka\\OneDrive\\Documents\\newsPortal\\send.js');
var receiveServer = require('C:\\Users\\sanka\\OneDrive\\Documents\\newsPortal\\receive.js');

var username;

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   username = req.body.username;
   res.render("home");
});

app.get('/home', function(req, res) {
    res.render('home');
})

app.get('/subscribe', function(req, res) {
    res.render('subscribe');
})

app.post('/subscribe', function(req, res) {
    res.send("");
})

app.get('/subscribedLists', function(req, res) {
    console.log(req.query);
    sendServer.sendRequest(req.query, username);
    res.send("Update subscribed news in database " +JSON.stringify(req.query));
})

app.get('/api', function(req, res) {
    receiveServer.getResponse();
    res.send("API Triggered");
})

app.get('/readNews', function(req, res) {
    res.send("Latest News");
})

app.listen(3000);