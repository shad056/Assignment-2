module.exports = function(app,db){
  //this route creates a group and checks whether the group already exists or not
    
      app.post('/api/creategroup', (req, res) => {
    
          var isGroup = 0;
          var userObj;
        
          var group = req.body.newgroup;
          db.collection('channels').find({Group:group}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result.length+1);
           if(result.length>0) {
                res.send({valid:false});
                }
                else {
                  var myquery = { Group:group,Channels:[] };
                  db.collection("channels").insertOne(myquery, function(err, ress) {
                if (err) throw err;
                res.send({valid:true})
              });
                }
          });
        
        });
    }