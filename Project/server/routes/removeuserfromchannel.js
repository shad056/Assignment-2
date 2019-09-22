module.exports = function(app,db){
  
  //this route removes a channel from a user
    app.post('/api/removeuserfromchannel', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        var isRole = 0;
     
        db.collection('users').find({user:req.body.user}).toArray(function (err, result) {
            if (err) throw err;
            
            //console.log(result.length+1);
               for(var i=0;i<result.length;i++) {
                 for(var j=0;j<result[i].Channels.length;j++)
               
                 if(result[i].Channels[j] == req.body.channel) {
                  isRole = 1;
              }
            }
              
            if(isRole == 1) {
              var myquery = { user: req.body.user};
              var newvalues = {$pull: {Channels: req.body.channel}};
              db.collection('users').update(myquery, newvalues, function(err, ress) {
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
    