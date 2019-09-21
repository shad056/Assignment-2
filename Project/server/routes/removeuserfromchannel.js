module.exports = function(app,fs){
  
  //this route removes a channel from a user
    app.post('/api/removeuserfromchannel', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        channel = req.body.channel;
        user = req.body.user;
        var userObj;
        noChannel = 1;
        var channels = [];
        var group = [];
         fs.readFile('./dataStorage/users.json','utf-8', function(err, data){
             if (err){
                 console.log(err);
             } else {
             userObj = JSON.parse(data);
          
 
             for (let i=0;i<userObj.length;i++){
                 if (userObj[i].user == user){
                   //Check for duplicates
                   for(let j=0;j<userObj[i].Groups.length;j++) {
                   if(userObj[i].Groups[j] != undefined)
                   group.push(userObj[i].Groups[j]);
                   }
                 }
               }
               
               fs.readFile('./dataStorage/channels.json','utf-8', function(err, data2){
                 if (err){
                     console.log(err);
                 } else {
                 userObj2 = JSON.parse(data2);
                 for (let i=0;i<userObj2.length;i++){
                 for(let j=0; j<group.length; j++)
                     if(userObj2[i].Group == group[j]) {
                         for(let k=0; k<userObj2.length;k++) {
                             if(userObj2[i].Channels[k] != undefined) {
                           channels.push(userObj2[i].Channels[k]);
                               
                         }
                         }
                     }
                 }
                 }
                      for(let i=0; i<channels.length; i++) {
                   if(channels[i] == channel) {
                       console.log(channel);
                     noChannel = 2;
                     
                 
                   }
               }

            });

            //My version
                   for (let i=0;i<userObj.length;i++){
              if(userObj[i].user == user) {
                for(let j=0; j<userObj[i].Channels.length;j++) {
                    if (userObj[i].Channels[j] == channel){
                      //find first instance of user name and success
                      var index = userObj[i].Channels.indexOf(channel);
                     userObj[i].Channels.splice(index,1);
                     noChannel = 0;
                     
                    }
                    
                    
                }
              }
            
          }
              
          if(noChannel == 0) {
            var newdata = JSON.stringify(userObj);
            fs.writeFile('./dataStorage/users.json',newdata,'utf-8',function(err){
              if (err) throw err;
              //Send response that registration was successfull.
              res.send({valid:true});
             });
          }
    //   else if (noChannel == 1) {
    //      res.send({valid:false, message: 'User is not part of this channel'});
    //   }
      else {
      res.send({valid:false, message: 'Cannot delete this channel, as the user is part of a group. Please delete the group to delete the channel OR the User is not part of this channel'});
      }

        }
       
       
        });


    //     fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
    //       if (err) {
    //           console.log(err);
    //           //Some error happended opening the file. No Success
    //           res.send({valid:false});
    //       } 
    //       else {
    //       userObj = JSON.parse(data);
    //       for (let i=0;i<userObj.length;i++){
    //           if(userObj[i].user == user) {
    //             for(let j=0; j<userObj[i].Channels.length;j++) {
    //                 if (userObj[i].Channels[j] == channel){
    //                   //find first instance of user name and success
    //                   var index = userObj[i].Channels.indexOf(channel);
    //                  userObj[i].Channels.splice(index,1);
    //                  noChannel = 0;
                     
    //                 }
                    
                    
    //             }
    //           }
            
    //       }
          
      
    //       //no username was found that matched
     
    //       if(noChannel == 0) {
    //           var newdata = JSON.stringify(userObj);
    //           fs.writeFile('./dataStorage/users.json',newdata,'utf-8',function(err){
    //             if (err) throw err;
    //             //Send response that registration was successfull.
    //             res.send({valid:true});
    //            });
    //         }
    //    else {
    //        res.send({valid:false, message: 'User is not part of this channel'});
    //    }
       
    //   }
        
        
    //       });
    });
    }
    