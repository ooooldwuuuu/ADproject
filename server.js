// require('marko/node-require').install();
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const util = require('util');

//app.set('port', 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/src/pages/testMonitor/', function(req, res) {
	res.sendFile('src/pages/testMonitor/holiday.html', {root: __dirname });
});
app.get('/src/pages/testMonitor/styles.css', function(req, res) {
	res.sendFile('src/pages/testMonitor/styles.css', {root: __dirname });
});
app.get('/src/pages/testMonitor/calendar.js', function(req, res) {
	res.sendFile('src/pages/testMonitor/calendar.js', {root: __dirname });
});
app.get('/src/pages/testMonitor/images/concords-logo.png', function(req, res) {
	res.sendFile('src/pages/testMonitor/images/concords-logo.png', {root: __dirname });
});

app.post('/api/data/', (req, res, next)=>{
	console.log(req.body);
	//res.end('ok');
	res.json({ status: 'ok' });
});
app.get('/login', function(req, res) {
	res.sendFile('src/pages/login/login.html', {root: __dirname });
});
app.get('/login.css', function(req, res) {
	res.sendFile('src/pages/login/login.css', {root: __dirname });
});
app.get('/api/logout/', (req, res, next)=>{
	console.log('Log out');
	res.sendFile('src/pages/login/login.html', {root: __dirname });
});

// app.get('/src/pages/owner', function(req, res){
//     res.sendFile('src/pages/owner/mediaowner.html', {root: __dirname });
// });
app.get('/src/pages/mediaowner/styles.css', function(req, res) {
	res.sendFile('/src/pages/mediaowner/styles.css', {root: __dirname });
});
app.get('/src/pages/mediaowner/mediaowner.js', function(req, res) {
	res.sendFile('/src/pages/mediaowner/mediaowner.js', {root: __dirname });
});

app.get('/src/pages/adowner/styles.css', function(req, res) {
	res.sendFile('/src/pages/adowner/styles.css', {root: __dirname });
});
app.get('/src/pages/adowner/adowner.js', function(req, res) {
	res.sendFile('/src/pages/adowner/adowner.js', {root: __dirname });
});

app.get('/src/pages/admin/styles.css', function(req, res) {
	res.sendFile('/src/pages/admin/styles.css', {root: __dirname });
});
app.get('/src/pages/admin/admin.js', function(req, res) {
	res.sendFile('/src/pages/admin/admin.js', {root: __dirname });
});

app.post('/login', function(req, res) {
	let identity = req.body.identity;
	console.log(req.body);
	//console.log(req.query);
	//console.log(identity);
	if (identity == 'Media Owner')
		res.sendFile('/src/pages/mediaowner/mediaowner.html', {root: __dirname });
	else if (identity == 'AD Owner')
		res.sendFile('/src/pages/adowner/adowner.html', {root: __dirname });
	else if (identity == 'Administrator')
		res.sendFile('/src/pages/admin/admin.html', {root: __dirname });
	else
		res.send('Wrong identity');
});
app.post('/app/data/add', function (req, res) {
	console.log(req.body);
	res.sendFile('/src/pages/mediaowner/mediaowner.html', {root: __dirname });
});
app.post('/app/data/media', function (req, res) {
	console.log(req.body);
	res.json({
		'mediaList': [
			{
				'seqNo': '0',
				'mediaName': 'Market',
				'location': 'Taipei',
				'time': '3',
				'price': '500',
				'income': '10000',
			},
		],
	});
});
app.post('/api/screen/videos', function (req, res) {
	console.log(req.body);
	res.json({
		'videoList': ['Dior', 'Chanel', 'feet'],
	});
});
app.post('/app/data/delete', function (req, res) {
	console.log(req.body);
	res.send(null);
});
app.get('/app/data/logout', function (req, res) {
	console.log('logout');
	res.sendFile('src/pages/login/login.html', {root: __dirname });
});
app.get('/videos/feet.mp4', function (req, res) {
	res.sendFile('src/videos/feet.mp4', {root: __dirname });
});
app.get('/videos/dior.mp4', function (req, res) {
	res.sendFile('src/videos/dior.mp4', {root: __dirname });
});
app.get('/videos/chanel.mp4', function (req, res) {
	res.sendFile('src/videos/chanel.mp4', {root: __dirname });
});
// app.post('/app/data/upload', (req, res, next)=>{
// 	console.log(req.body);
// 	res.sendFile('/src/pages/adowner/adowner.html', {root: __dirname });
// 	//res.end('ok');
// 	// res.json({ status: 'ok' });
// });
app.post('/api/screens', function(req, res) {
	let obj = {
		no: '',
		screen_name: '',
		location: '',
	};
	let name = ['Sony', 'LG', 'Sharp'];
	let spot = ['Pingtung', 'Kaohsiung', 'Taipei'];
	let sendStr = '';
	for (let i = 0; i < 5; i++) {
		obj.no = i.toString();
		obj.screen_name = name[i % 3];
		obj.location = spot[i % 3];
		sendStr = sendStr + JSON.stringify(obj) + '\n';
	}
	res.send(sendStr);
});
app.post('/api/medias/', function(req, res) {
	let sendObj = {
		url: '',
		media_name: '',
	};
	let url = ['/videos/feet.mp4', '/videos/dior.mp4', '/videos/chanel.mp4'];
	let name = ['feet', 'Dior', 'Chanel'];
	let sendStr = '';
	for (let i = 0; i < 5; i++) {
		sendObj.media_name = name[i % 3];
		sendObj.url = url[i % 3];
		sendStr = sendStr + JSON.stringify(sendObj) + '\n';
	}
	res.send(sendStr);
});
app.post('/api/media/new', function(req, res) {
	// console.log(req.body);
	let form = new multiparty.Form();

	form.parse(req, function(err, fields, files) {
		Object.keys(fields).forEach(function(name) {
			console.log('got field named ' + name);
		});
		console.log(fields);

		Object.keys(files).forEach(function(name) {
			console.log('got file named ' + name);
		});
		console.log(files);
		console.log('Upload completed!');
		res.writeHead(200, {'content-type': 'text/plain'});
		res.end('Received ' + files.length + ' files');
	});
});

app.get('/upload', function(req, res) {
	res.sendFile('src/pages/testUpload/index.html', {root: __dirname });
});
app.get('/upload.js', function(req, res) {
	res.sendFile('src/pages/testUpload/upload.js', {root: __dirname });
});

app.listen(8080, function() {
	console.log('listening on port 8080...');
});

/*
const server = http.createServer(app);
server.listen(8080);
*/
