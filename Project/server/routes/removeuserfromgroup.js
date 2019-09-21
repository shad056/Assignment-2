module.exports = function(app,fs){
  
  //this route removes a group from a user
    app.post('/api/removeuserfromgroup', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        user = req.body.user;
        group = req.body.group
       isUser = 1;
        var userObj;
      
     
        fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({valid:false});
          } 
          else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if (userObj[i].user == user){
              //find first instance of user name and success
             for(let j=0;j<userObj[i].Groups.length;j++) {
                 if(userObj[i].Groups[j] == group) {
                    var index = userObj[i].Groups.indexOf(group);
                    userObj[i].Groups.splice(index,1);
                   isUser = 0;
                 }
             }
             
            }
          }
          if(isUser == 0) {
          var newdata = JSON.stringify(userObj);
          fs.writeFile('./dataStorage/users.json',newdata,'utf-8',function(err){
            if (err) throw err;
            //Send response that registration was successfull.
            res.send({valid:true});
           });
        }
        else {
            res.send({valid: false});
        }
          //no username was found that matched
       
       
      }
        
        
          });
    });
    }
    