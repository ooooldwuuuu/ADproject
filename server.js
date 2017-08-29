// require('marko/node-require').install();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile('src/pages/login/login.html', {root: __dirname });
});
app.get('/login.css', function(req, res){
    res.sendFile('src/pages/login/login.css', {root: __dirname });
});

app.get('/src/pages/owner', function(req, res){
    res.sendFile('src/pages/owner/mediaowner.html', {root: __dirname });
});
app.get('/src/pages/styles.css', function(req, res){
    res.sendFile('src/pages/owner/styles.css', {root: __dirname });
});

app.post('/src/pages/owner', function(req, res){
    let identity = req.query.identity;
    console.log(req.params);
    //console.log(req.query);
    //console.log(identity);
    if(identity == "Media Owner")
        res.send('Got post request');
    else
        res.send('Wrong identity');
});

app.listen(8080, function(){
    console.log('listening on port 8080...');
});