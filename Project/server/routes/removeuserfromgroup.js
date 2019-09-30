module.exports = function(app,db){
  
  //this route removes a group from a user
    app.post('/api/removeuserfromgroup', function(req,res){
    
      if(!req.body) {
        return res.sendStatus(400);
    }
    var isRole = 0;
     
    db.collection('users').find({user:req.body.user}).toArray(function (err, result) {
        if (err) throw err;
        
        //console.log(result.length+1);
           for(var i=0;i<result.length;i++) {
             for(var j=0;j<result[i].Groups.length;j++)
           
             if(result[i].Groups[j] == req.body.group) {
              isRole = 1;
          }
        }
          
        if(isRole == 1) {
          var myquery = { user: req.body.user};
          var newvalues = {$pull: {Groups: req.body.group}, $set:{Channels: []}};
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
    