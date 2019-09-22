module.exports = function(app,db){

  //This route adds a user to a channel and checks if the user has already been added to this channel or not
    app.post('/api/addusertochannel', (req, res) => {
        var isChannel = 0;
        var userObj;
        var isGroup = 0;
        var user = req.body.user;
       var channel = req.body.channel;
       var channels = [];
       var group = [];

       db.collection('users').find({user:user}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        for(var i=0;i<result.length;i++) {
          for(var j=0;j<result[i].Channels.length;j++)
          if(result[i].Channels[j] == channel) {
          isChannel = 1
          }
        }
       if(isChannel>0) {
            res.send({valid:false});
            }
            else {
              var myquery = { user: user};
              var newvalues = {$push: {Channels: channel}};
              db.collection("users").updateOne(myquery, newvalues, function(err, ress) {
                  if (err) throw err;
                  res.send({valid:true});
              });
            }
      });
       
         

            
           });
     
}