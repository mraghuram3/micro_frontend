const path = require('path');
const express = require('express');
const cors = require('cors');


const hostApp = express();
const remote1App = express();
const remote2App = express();
const remote3App = express();
// const simpleCompLibApp = express();
// const vendorApp = express();

hostApp.use(cors())
remote1App.use(cors())
remote2App.use(cors())
remote3App.use(cors())



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


remote3App.use(express.static(__dirname + '/remote3/dist'));
remote3App.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/remote3/dist/index.html'));
});
remote3App.listen(process.env.PORT || 5004);



// vendorApp.use(express.static(__dirname + '/vendor_modules'));
// vendorApp.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/vendor_modules/index.html'));
// });
// vendorApp.listen(process.env.PORT || 5004);