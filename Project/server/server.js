var express = require('express'); //import the express module for better middleware and routing
var fs = require('fs'); //import the fs module for interactivity with the files
var app = express();
var path = require('path'); //import the path module for path parsing/resolution
const http = require('http').Server(app).listen(3000,function(){
  console.log('Server started');
}); //start the server on localhost: port 3000
var bodyParser = require('body-parser'); //import the body parser module to receive parameters/values within the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
}); //this allows the Cross origin request
app.use(express.static(path.join(__dirname + '../dist/lab/'))); //path to join the build version of this project
const io = require('socket.io')(http);

const formidable = require('formidable');
require('./socket.js')(app, io);
app.get('/images',function(req,res) {
  //res.sendFile(__dirname + './userimages/*');
  console.log('here');
});

app.use('/api/images',express.static(path.join(__dirname,'/userimages')));
app.use('/api/imagez',express.static(path.join(__dirname,'/channelimages')));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, { poolSize: 10 }, function (err, client) {
  if (err) { return console.log(err) }
  const dbName = 'chatapp';
  const db = client.db(dbName);
//The following are all the routes (available in the routes folder) matching the requests from the client side:
require('./routes/accountroute.js')(app,db);
require('./routes/authenticationroute.js')(app,db);
require('./routes/groupsroute.js')(app,db);
require('./routes/channelsroute.js')(app,db);
require('./routes/creategrouproute.js')(app,db);
require('./routes/createuserroute.js')(app,db);
require('./routes/createchannelroute.js')(app,db);
require('./routes/getgroupsroute.js')(app,db);
require('./routes/getchannelsroute.js')(app,db);
require('./routes/getusersroute.js')(app,db);
require('./routes/addusertochannelroute.js')(app,db);
require('./routes/removegrouproute.js')(app,db);
require('./routes/removechannelroute.js')(app,db);
require('./routes/removeuserfromchannel.js')(app,db);
require('./routes/removeuserroute.js')(app,db);
require('./routes/assignusergroupassis.js')(app,db);
require('./routes/assignuserrole.js')(app,db);
require('./routes/addusertogroup.js')(app,db);
require('./routes/removeuserfromgroup.js')(app,db);
require('./routes/usergroupchannels.js')(app,db);
require('./routes/recordhistory.js')(app,db);
require('./routes/addImage.js')(app,db);
require('./routes/read.js')(app,db);
require('./routes/showhistory.js')(app,db);
require('./routes/upload.js')(app,formidable);

});
