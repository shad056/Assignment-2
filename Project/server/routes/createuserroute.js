module.exports = function(app,db){

    //this route creates a new user and checks whether user already exists or not
      app.post('/api/createuser', (req, res) => {
    
          var isGroup = 0;
          var userObj;
        
          var uname = req.body.user;
          var email = req.body.email;
          var password = req.body.password;
          db.collection('users').find({user:uname}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result.length+1);
            if(result.length>0) {
                res.send({valid:false});
            }
            else {
            db.collection('users').insertOne({user:uname,password:password,email:email, Groups:[], Channels: [], Roles: []}, function(err, ress) {
                if (err) throw err;
                
                res.send({valid:true});
            });
            
                }
          });
          




        });
    }