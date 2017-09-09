// require('marko/node-require').install();
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//app.set('port', 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/src/pages/testMonitor/', function(req, res){
    res.sendFile('src/pages/testMonitor/holiday.html', {root: __dirname });
});
app.get('/src/pages/testMonitor/styles.css', function(req, res){
    res.sendFile('src/pages/testMonitor/styles.css', {root: __dirname });
});
app.get('/src/pages/testMonitor/calendar.js', function(req, res){
    res.sendFile('src/pages/testMonitor/calendar.js', {root: __dirname });
});
app.get('/src/pages/testMonitor/images/concords-logo.png', function(req, res){
    res.sendFile('src/pages/testMonitor/images/concords-logo.png', {root: __dirname });
});

app.post('/api/data/', (req, res, next)=>{
    console.log(req.body)
	//res.end('ok');
	res.json({ status: 'ok' });
});
app.get('/api/data/:year', (req, res, next)=>{
    console.log(req.params)
    //res.end('ok');
    res.json({
        'holiday':{ '10': [ '01', '07', '08', '14', '15', '21', '22', '28', '29' ],
                    '11': [ '04', '05', '11', '12', '18', '19', '25', '26' ],
                    '12': [ '02', '03', '09', '10', '16', '17', '23', '24', '30', '31' ],
                    '01': [ '01', '02', '07', '08', '14', '15', '21', '22', '28', '29' ],
                    '02': [ '04', '05', '11', '12', '18', '19', '25', '26' ],
                    '03': [ '04', '05', '11', '12', '18', '19', '25', '26' ],
                    '04': [ '01', '02', '08', '09', '15', '16', '22', '23', '29', '30' ],
                    '05': [ '06', '07', '13', '14', '20', '21', '27', '28' ],
                    '06': [ '03', '04', '10', '11', '17', '18', '24', '25' ],
                    '07': [ '01', '02', '08', '09', '15', '16', '22', '23', '29', '30' ],
                    '08': [ '05', '06', '12', '13', '19', '20', '26', '27' ],
                    '09': [ '02', '03', '09', '10', '16', '17', '23', '24', '30' ]},
        'notrade':{ '02':['8', '9', '10']}
    });
	// res.json({ '10': [ '01', '07', '08', '14', '15', '21', '22', '28', '29' ],
    // '11': [ '04', '05', '11', '12', '18', '19', '25', '26' ],
    // '12': [ '02', '03', '09', '10', '16', '17', '23', '24', '30', '31' ],
    // '01': [ '01', '02', '07', '08', '14', '15', '21', '22', '28', '29' ],
    // '02': [ '04', '05', '11', '12', '18', '19', '25', '26' ],
    // '03': [ '04', '05', '11', '12', '18', '19', '25', '26' ],
    // '04': [ '01', '02', '08', '09', '15', '16', '22', '23', '29', '30' ],
    // '05': [ '06', '07', '13', '14', '20', '21', '27', '28' ],
    // '06': [ '03', '04', '10', '11', '17', '18', '24', '25' ],
    // '07': [ '01', '02', '08', '09', '15', '16', '22', '23', '29', '30' ],
    // '08': [ '05', '06', '12', '13', '19', '20', '26', '27' ],
    // '09': [ '02', '03', '09', '10', '16', '17', '23', '24', '30' ] });
});


app.get('/login', function(req, res){
    res.sendFile('src/pages/login/login.html', {root: __dirname });
});
app.get('/login.css', function(req, res){
    res.sendFile('src/pages/login/login.css', {root: __dirname });
});

// app.get('/src/pages/owner', function(req, res){
//     res.sendFile('src/pages/owner/mediaowner.html', {root: __dirname });
// });
app.get('/src/pages/owner/styles.css', function(req, res){
    res.sendFile('src/pages/owner/styles.css', {root: __dirname });
});
app.get('/src/pages/owner/mediaowner.js', function(req, res){
    res.sendFile('src/pages/owner/mediaowner.js', {root: __dirname });
});

app.post('/src/pages/owner/', function(req, res){
    let identity = req.body.identity;
    console.log(req.body);
    //console.log(req.query);
    //console.log(identity);
    if(identity == "Media Owner")
        res.sendFile('src/pages/owner/mediaowner.html', {root: __dirname });
    else
        res.send('Wrong identity');
});


app.listen(8080, function(){
    console.log('listening on port 8080...');
});

/*
const server = http.createServer(app);
server.listen(8080);
*/