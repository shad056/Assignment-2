module.exports = function(app,db){
   //This route authenticates a user and checks if the user is available in the JSON file (users.json) or not
  

app.post('/api/auth', function(req,res){

    if(!req.body) {
        return res.sendStatus(400);
    }

    username = req.body.username;
    password = req.body.password;
    const collection = db.collection('users');

    collection.find({user:username,password:password}).count(function(err,count){
    
      if(count > 0){
        res.send({username:username,valid:true});
      } else {
        res.send({valid:false});
      }
   
        });
    // fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
    //   if(err) throw err;
    //   let userArray = JSON.parse(data);
     
    //   let i = userArray.findIndex(user => 
    //     ((user.user == username)));
    //     if(i == -1) {
    //       res.send({valid: false});
       
    //     }
    //     else {

    //       res.send({valid: true, username: username});
    //     }
    
    
    //   });
});
}
