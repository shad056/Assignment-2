module.exports = function(app,fs){
  
  //this route removes a channel from a group and users that have been assigned to it
    app.post('/api/removechannel', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        channel = req.body.channel;
      
        var userObj;
        var userObj2;
      
        fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({valid:false});
          } 
          else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
              for(let j=0; j<userObj[i].Channels.length;j++) {
            if (userObj[i].Channels[j] == channel){
              //find first instance of user name and success
             
              var index = userObj[i].Channels.indexOf(channel);
             userObj[i].Channels.splice(index,1);
            
            }
        }
          }
          var newdata = JSON.stringify(userObj);
          fs.writeFile('./dataStorage/channels.json',newdata,'utf-8',function(err){
            if (err) throw err;
            //Send response that registration was successfull.
            // res.send({valid:true});
           });
          //no username was found that matched
        fs.readFile('./dataStorage/users.json','utf8', function(err, data2) {
            if (err) throw err;
            //Send response that registration was successfull.
            userObj2 = JSON.parse(data2);
            
           for (let i=0;i<userObj2.length;i++){
               for(let j=0; j<userObj2[i].Channels.length; j++) {
               if (userObj2[i].Channels[j] == channel){
                  //find first instance of user name and success
               var index = userObj2[i].Channels.indexOf(channel);
               userObj2[i].Channels.splice(index,1);
              
            
                }
             
            }
              }
              var newdata2 = JSON.stringify(userObj2);
              fs.writeFile('./dataStorage/users.json',newdata2,'utf-8',function(err){
                if (err) throw err;
                //Send response that registration was successfull.
                res.send({valid:true});
               });
             
        });
       
      }
        
        
          });
    });
    }
    