

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
           
            // for(var i=0;i<group.length;i++) {
            //     groups = group[i];
            
            //      db.collection('channels').find({Group:groups}).toArray(function (err, result2) {
                   
            //       if (err) throw err;
            //       //console.log(result.length+1);
            //       for(var i=0;i<result2.length;i++) {
            //           for(var j=0;j<result2[i].Channels.length;j++)
            //         channels.push(result2[i].Channels[j]);
            //       }
                  
                 
            //     });
            // }
            
        
            // res.send({valid:true,channel:channels});
                
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
         
    //     fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
    //       if (err) {
    //           console.log(err);
    //           //Some error happended opening the file. No Success
    //           res.send({channel:channels,valid:false});
    //       } else {
    //       userObj = JSON.parse(data);
    //       for (let i=0;i<userObj.length;i++){
    //         if(userObj[i].user == user){
    //             group = userObj[i].Groups;
    //         }
    //       }

    //       fs.readFile('./dataStorage/channels.json', 'utf8', function(err,data2) {
    //         if (err) {
    //             console.log(err);
    //             //Some error happended opening the file. No Success
    //             res.send({channel:channels,valid:false});
    //         }
    //         else {
    //             userObj2 = JSON.parse(data2);
    //             for(let i=0; i<userObj2.length;i++) {
    //                 for(let j=0;j<group.length;j++) {
                        
    //                     if(userObj2[i].Group == group[j]) {
    //                         for(let k=0;k<userObj2[i].Channels.length;k++) {
    //                             channels.push(userObj2[i].Channels[k]);
    //                         }
                            
                            
    //                     }
    //                 } 
                  
    //             }
    //             res.send({channel:channels,valid:true});
    //         }

    //       });
         
    //       //res.send({channel:channels,valid:true});
    //   }
        
        
    //       });
    });
    }
    