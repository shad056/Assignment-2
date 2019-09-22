module.exports = function(app,db){
   //This route adds a user the role of a group assis and checks if the user has already been added this role or not
    app.post('/api/assignusergroupassis', (req, res) => {
      isRole = 0;
      db.collection('users').find({user:req.body.user}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
           for(var i=0;i<result.length;i++) {
             for(var j=0;j<result[i].Roles.length;j++) {
              
             if(result[i].Roles[j] == "Group Assis") {
              isRole = 1;
              
          }
        }
        }
          if(isRole == 1) {
            res.send({valid:false})
          }
          else {
            var myquery = { user: req.body.user};
            var newvalues = {$push: {Roles: "Group Assis"}};
            db.collection('users').updateOne(myquery, newvalues, function(err, ress) {
                if (err) throw err;
                res.send({valid:true});
            });
          }
       
      });
    });
}