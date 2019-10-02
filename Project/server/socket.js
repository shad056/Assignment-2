module.exports = function (app, io) {
  console.log("Server Socket Initialised");
  //respond to connection request
  io.on('connection', (socket) => {
    console.log('user connection');
    //respond to disconnect request
    socket.on('disconnect', function () {
      console.log('user disconnection');
    });
    
    socket.on('join', function(data){
      //joining room which is of ngModel in app.component.html
      socket.join(data.channel); 
  
      console.log(data.user + ' joined the channel : ' + data.channel);
    //inform other users who are part of this room that a new user has just joined this room
    io.in(data.channel).emit('join', {user:data.user, message:' has joined this channel.',image:data.image});
    });
    socket.on('leave', function(data){
    
      console.log(data.user + ' left the channel : ' + data.channel);
  
      io.in(data.channel).emit('leave', {user:data.user, message:' has left this room.',image:data.image});
  
      socket.leave(data.channel);
    });
  //respond to getting a new message
  socket.on('add-message',function(data){

    io.in(data.channel).emit('new message', {user:data.user, message:data.message, image:data.image});
  })

  socket.on('add-image',function(data){

    io.in(data.channel).emit('new image', {user:data.user, message:data.message, image:data.image});
  })
  
  });

  

}
