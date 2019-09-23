module.exports = function (app, db) {
    app.post('/api/addImage', (req, res) => {
      var uname = req.body.username;
      var uimage = req.body.imagename;
     
      var UserExist = false;
      var myquery = { user: uname };
      var newvalues = { $set: { image: uimage } };
      
      db.collection('users').updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        console.log("User updated");
    
        res.send(true);
      });
    });
  }
  