module.exports = function(app,fs){
   //This route adds a user to a group and checks if the user has already been added to this group or not
    app.post('/api/addusertogroup', (req, res) => {
        var isChannel = 0;
        var userObj;
        var isRole = 0;
        var user = req.body.user;
        var group = req.body.group;
     
        fs.readFile('./dataStorage/users.json','utf-8', function(err, data){
            if (err){
                console.log(err);
            } else {
            userObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
              if (userObj[i].user == user){
                //Check for duplicates
                for(let j=0;j<userObj[i].Groups.length;j++) {
                if(userObj[i].Groups[j] == group) {
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
                      userObj[i].Groups.push(group);
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