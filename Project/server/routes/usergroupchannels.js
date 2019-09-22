

module.exports = function(app,db){
  //this route fetches all the channels available in a group
  
    app.post('/api/usergroupchannels', function(req,res){
            var user = req.body.username;
            var group = [];
       
        db.collection('users').find({user:user}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result.length+1);
            for(var i=0;i<result.length;i++) {
                for(var j=0;j<result[i].Groups.length;j++)
              group.push(result[i].Groups[j]);
            }
           
          res.send({valid:true,group:group});
           
      
                
        });  
          
        app.post('/api/usergroupchannelz', function(req,res){
            var group = req.body.group;
            var channels = [];
            var groups = '';
            var channelz = [];
        db.collection('channels').find({Group:group}).toArray(function (err, result) {
            if (err) throw err;
            for(var i=0;i<result.length;i++) {
                for(var j=0;j<result[i].Channels.length;j++)
                channels.push(result[i].Channels[j]);
            }
             res.send({valid:true,channel:channels});
        }); 
       
       
    }); 
         
  
    });
    }
    