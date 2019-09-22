module.exports = function(app,db){
   //This route creates a new channel and checks whether the channel already exists or not
        app.post('/api/createchannel', (req, res) => {
            var isChannel = 0;
            var userObj;
            
            var group = req.body.group;
           var channel = req.body.channel;

         
            //console.log(result.length+1);           
         
                db.collection('channels').find({}).toArray(function (err2, result2) {
                    if (err2) throw err2;
                    for(var i=0;i<result2.length;i++) {
                        for(var j=0;j<result2[i].Channels.length;j++)
                        if(result2[i].Channels[j] == channel) {
                            isChannel = 1;
                        }
                        
                    }
                    if(isChannel == 1) {
                        res.send({valid:false});
                    }
                    else {
                        var myquery = { Group: group};
                        var newvalues = {$push: {Channels: channel}};
                        db.collection("channels").updateOne(myquery, newvalues, function(err, ress) {
                            if (err) throw err;
                            res.send({valid:true});
                        });
                    }
                });

        });

        app.post('/api/createchannelz', (req, res) => {
            
            db.collection("channelhistory").insertOne({channel:req.body.channel,history:[]}, function(err, ress) {
                if (err) throw err;
                res.send({valid:true});
            });
            });
    }