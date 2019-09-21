


module.exports = function(app,path){
   app.get('/account',function(req,res){ 
        let filepath = path.resolve('./www/account.html'); 
        res.sendFile(filepath);
});
}