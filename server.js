// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var myApp = require('./myApp');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

myApp(app);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// visit app every 20 minutes
const https = require("https"),
      url = 'https://timestamp-microservice.dykisa.web.id',
      every = 20,
      oneMinute = 60 * 1000;
console.log(`The app will revisiting itself after ${every} minutes`);
setInterval(function() {
  console.log(`Visiting '${url}' by app itself...`);
  const req = https.get(url);
  console.log('request', req.finished ? 'completed succesfully.' : 'failed.');
}, every * oneMinute);
