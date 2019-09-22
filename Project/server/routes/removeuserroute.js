module.exports = function(app,db){
  
  //this route removes a user
    app.post('/api/removeuser', function(req,res){
    
     
        var user = req.body.user;
        db.collection('users').find({user:req.body.user}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result.length+1);
            if(result.length>0) {
                db.collection('users').remove({user:req.body.user}, {justOne:true},function(err, obj) {
                    if (err) throw err;
                    res.send({valid:true})
            });
            
            }
            else {
                res.send({valid:false});
                }
          });
        
    });
    }
    