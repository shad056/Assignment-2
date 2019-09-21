module.exports = function(app,fs){
   //This route adds a user the role of a group assis and checks if the user has already been added this role or not
    app.post('/api/assignusergroupassis', (req, res) => {
        var isChannel = 0;
        var userObj;
        var isRole = 0;
        var user = req.body.user;
     
        fs.readFile('./dataStorage/users.json','utf-8', function(err, data){
            if (err){
                console.log(err);
            } else {
            userObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
              if (userObj[i].user == user){
                //Check for duplicates
                for(let j=0;j<userObj[i].Roles.length;j++) {
                if(userObj[i].Roles[j] == 'Group Assis') {
                isRole = 1;
                }
            }
              }
            }
            if(isRole == 1) {
                res.send({valid:false});
            }
            else {
                for (let i=0;i<userObj.length;i++){
                    if (userObj[i].user == user){
                      //Check for duplicates
                      userObj[i].Roles.push('Group Assis');
                    }
                  }
                  var newdata = JSON.stringify(userObj);
                  fs.writeFile('./dataStorage/users.json',newdata,'utf-8',function(err){
                    if (err) throw err;
                    //Send response that registration was successfull.
                    res.send({valid:true});
                   });

            }

            
           }
        })
    });
}