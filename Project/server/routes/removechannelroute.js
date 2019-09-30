module.exports = function(app,db){
  
  //this route removes a channel from a group and users that have been assigned to it
    app.post('/api/removechannel', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
        isUser = 0;
        user = '';
        db.collection('users').find({}).toArray(function (err, result) {
          if (err) throw err;
          //console.log(result.length+1);
          var query = {};

            for(var i=0;i<result.length;i++) {
              for(var j=0;j<result[i].Channels.length;j++)
              if (result[i].Channels[j] == req.body.channel) {
                 query = {$pull:{Channels:req.body.channel}};
                 isUser = 1;
                 user = result[i].user
              }
            }
            if(isUser == 0) {
              res.send({valid:true});
            }
            else {
              db.collection("users").update({user:user},query ,function(err2, ress) {
                if (err2) {console.log(err2);}
                 else {
                   
            res.send({valid:true});
                 }
                  });
            }

        });
        
    });


    app.post('/api/removechannelz', function(req,res){
    
      if(!req.body) {
          return res.sendStatus(400);
      }
  
   
      db.collection('channels').find({}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        var query = {};
          for(var i=0;i<result.length;i++) {
            for(var j=0;j<result[i].Channels.length;j++)
            if (result[i].Channels[j] == req.body.channel) {
               query = {$pull:{Channels:req.body.channel}};
             
        db.collection("channels").update({Group:result[i].Group},query ,function(err2, ress) {
              if (err2) throw err;
              
            db.collection('channelhistory').remove({channel:req.body.channel}, {justOne:true},function(err, obj) {
     if (err) throw err;
      res.send({valid:true})
});
               
                });
            }
          }
           
       
      });
      
  });

  app.post('/api/removechannelzz', function(req,res){
    console.log('here')
    if(!req.body) {
        return res.sendStatus(400);
    }

 
    db.collection('channelhistory').remove({channel:req.body.channel}, {justOne:true},function(err, obj) {
      if (err) throw err;
      res.send({valid:true})
});
  });
    }
    