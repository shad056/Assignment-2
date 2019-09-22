module.exports = function(app,db){

    //this route creates a new user and checks whether user already exists or not
      app.post('/api/recordhistory', (req, res) => {
    
          var isGroup = 0;
          var userObj;
        
          var user = req.body.user;
          var message = req.body.message;
          var dateTime = req.body.dateTime;
          var channel = req.body.channel;
          db.collection('channelhistory').find({channel:channel}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result.length+1);
            if(result.length>0) {
                var myquery = { channel: channel};
                var newvalues = {$push: {history: dateTime + ': ' + user + message}};
                db.collection("channelhistory").updateOne(myquery, newvalues, function(err, ress) {
                    if (err) throw err;
                    res.send({valid:true});
                });
            }
            else {
          
                res.send({valid:false});
                }
          });
          




        });
    }