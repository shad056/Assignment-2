
module.exports = function(app,db){
  
  //this route gets all the available channels within the channels.json file
    app.get('/api/getchannels', function(req,res){
    
        var channels = [];
      //   fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
      //     if (err) {
      //         console.log(err);
      //         //Some error happended opening the file. No Success
      //         res.send({channel:channels,valid:false});
      //     } else {
      //     userObj = JSON.parse(data);
      //     for (let i=0;i<userObj.length;i++){
      //       for(let j=0; j<userObj[i].Channels.length; j++) {
      //           if (userObj[i].Channels[j] != undefined) {
      //               channels.push(userObj[i].Channels[j]);
      //           }
      //       }
      //     }
      //     res.send({channel:channels,valid:true});
      // }
        
        
      //     });
      db.collection('channels').find({}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        for(var i=0;i<result.length;i++) {
          channels.push(result[i].Channels);
        }
        res.send({valid:true,channels:channels}); 
      });
    });
    }
    