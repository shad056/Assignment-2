module.exports = function(app,db){
  //this route removes a group and all the channels associated to it plus from the users who have been assigned this group and its channels
  
    app.post('/api/removegroup', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        group = req.body.group;
        channels = [];
        var userObj;
        var userObj2;
        db.collection('channels').find({Group:group}).toArray(function (err, result) {
          if (err) throw err;
          //console.log(result.length+1);
          if(result.length>0) {
            for(var i=0;i<result.length;i++) {
              for(var j=0;j<result[i].Channels.length;j++)
              channels.push(result[i].Channels[j]);
            }
          }
         res.send({channel:channels});
        });
      });
        app.post('/api/removegroupz', function(req,res){
         
          
        db.collection('users').find({}).toArray(function (err, result) {
          if (err) throw err;
          //console.log(result.length+1);
          var query = {};
          db.collection("channelhistory").remove({channel:req.body.channel}, {justOne:true});
            for(var i=0;i<result.length;i++) {
              for(var j=0;j<result[i].Channels.length;j++)
              if (result[i].Channels[j] == req.body.channel) {
                 query = {$pull:{Channels:req.body.channel}};
               
          db.collection("users").update({user:result[i].user},query ,function(err2, ress) {
                if (err2) throw err;
                 else {
                   
               
           
                 }
                  });
              }
              
            }
            
            res.send({valid:true});
         
        });

      
    });

    app.post('/api/removegroupzz', function(req,res){
         
       var ss = false;
      db.collection('users').find({}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        // var query2 = {$pull:{Groups:req.body.group}};
        // db.collection("users").update({user:result[i].user},query2);
          for(var i=0;i<result.length;i++) {
            for(var j=0;j<result[i].Groups.length;j++)
            if (result[i].Groups[j] == req.body.group) {
               var query = {$pull:{Groups:req.body.group}};
        db.collection("users").update({user:result[i].user},query ,function(err2, ress) {
              if (err2) throw err;
               else {
          
              
               }
                });
            }

          }
          // var query2 = {$pull:{Groups:req.body.group}};
          // db.collection("users").update({user:result[i].user},query2 ,function(err3, resss) {
          //   if (err3) throw err;
          //   else {
          //    console.log('done');
          //   }
          //     });  
          res.send({valid:true});
         
        
       
      });

    
  });

  app.post('/api/removegroupzzz', function(req,res){
         
       
    db.collection("channels").remove({Group:req.body.group}, {justOne:true},function(err, obj) {
      if (err) throw err;
      else {
        res.send({valid:true});
      }
    });

  
});

    }
    