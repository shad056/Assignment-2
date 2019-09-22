
module.exports = function(app,db){
  
  //this route gets all the available channels within the channels.json file
    app.get('/api/getchannels', function(req,res){
    
        var channels = [];
    
      db.collection('channels').find({}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        for(var i=0;i<result.length;i++) {
          for(var j=0;j<result[i].Channels.length;j++)
          channels.push(result[i].Channels[j]);
        }
        
        res.send({valid:true,channel:channels}); 
      });
    });
    }
    