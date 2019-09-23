module.exports = function (app, db) {
    app.post('/api/read', (req, res) => {
      db.collection('users').find({user:req.body.username}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        res.send(JSON.stringify(result));
      });
    });
}