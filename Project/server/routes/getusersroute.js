
module.exports = function(app,db){
  
  //this routes gets all the users from the users.json file
    app.get('/api/getusers', function(req,res){
    
        var users = [];
      //   fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
      //     if (err) {
      //         console.log(err);
      //         //Some error happended opening the file. No Success
      //         res.send({user:users,valid:false});
      //     } else {
      //     userObj = JSON.parse(data);
      //     for (let i=0;i<userObj.length;i++){
         
      //         //find first instance of user name and success
      //          users.push(userObj[i].user);
      //     }
      //     res.send({user:users,valid:true});
      // }
        
        
      //     });

      db.collection('users').find({}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        for(var i=0;i<result.length;i++) {
          users.push(result[i].user);
        }
        res.send({valid:true,user:users}); 
      });
    });
    }
    