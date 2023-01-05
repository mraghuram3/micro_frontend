const path = require('path');
const express = require('express');

const hostApp = express();
const remote1App = express();
const remote2App = express();


hostApp.use(express.static(__dirname + '/host/dist'));
hostApp.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/host/dist/index.html'));
});
hostApp.listen(process.env.PORT || 5001);


remote1App.use(express.static(__dirname + '/remote1/dist'));
remote1App.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/remote1/dist/index.html'));
});
remote1App.listen(process.env.PORT || 5002);


remote2App.use(express.static(__dirname + '/remote2/dist'));
remote2App.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/remote2/dist/index.html'));
});
remote2App.listen(process.env.PORT || 5003);