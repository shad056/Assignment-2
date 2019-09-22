module.exports = function(app,db){
   //This route adds a user to a group and checks if the user has already been added to this group or not
    app.post('/api/addusertogroup', (req, res) => {

        var isGroup = 0;
     
      db.collection('users').find({user:req.body.user}).toArray(function (err, result) {
          if (err) throw err;
          //console.log(result.length+1);
             for(var i=0;i<result.length;i++) {
               for(var j=0;j<result[i].Groups.length;j++)
               if(result[i].Groups[j] == req.body.group) {
                isGroup = 1;
            }
          }
            
          if(isGroup == 1) {
            res.send({valid:false})
          }
          else {
            var myquery = { user: req.body.user};
            var newvalues = {$push: {Groups: req.body.group}};
            db.collection('users').updateOne(myquery, newvalues, function(err, ress) {
                if (err) throw err;
                res.send({valid:true});
            });
          }

        });
    });
}