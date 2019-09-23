module.exports = function (app, db) {
    app.post('/api/showhistory', (req, res) => {
        
      db.collection('channelhistory').find({channel:req.body.channel}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result.length+1);
        
        res.send({result:result});
      });
    });
}