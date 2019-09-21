module.exports = function(app,fs){
  
   //This route loads all the channels available within a particular group
    app.post('/api/channels', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        group = req.body.chosengroup;
        var channel = [];
        fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({channel:channel,valid:false});
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if (userObj[i].Group == group){
              //find first instance of user name and success
               channel = userObj[i].Channels;
              
              res.send({channel:channel,valid:true});
              return;
            }
          }
          //no username was found that matched
          res.send({channel:channel,valid:false});
  
      }
        
        
          });
    });
    }
    