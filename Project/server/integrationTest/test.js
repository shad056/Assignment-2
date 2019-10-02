var assert = require('assert');
const express = require('express');
const app = express();
var http = require('http');
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

/////////////////Adding image route/////////////////////////
///////////////////////////////////////////////////////////

describe('The add image route',()=>{
    before(function(){   ///This function is called before the test is executed
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2', email: 'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){   ///This function is called after the test is executed
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should upload image and return true in response',function(done){   //this is where the actual test is executed
      api.post('/api/addImage')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        username: 'Test2', imagename: 'ER Diagram.jpg'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.equal(true);
   
       done();
      });
    });
    it('should upload image and return no errors',function(done){
        api.post('/api/addImage')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          username: 'Test2', imagename: 'ER Diagram.jpg'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         
         expect(res.body).to.not.equal(false);
         done();
        });
      });
  });


/////////////////Adding user to a channel route/////////////////////////
///////////////////////////////////////////////////////////

describe('Adding user to a channel route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2', email: 'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should add user to a channel',function(done){
      api.post('/api/addusertochannel')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        user: 'Test2', channel: '6'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
      
       done();
      });
    });

    it('should add user to a channel and not return unexpected parameters',function(done){
        api.post('/api/addusertochannel')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          user: 'Test2', channel: '6'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         
         expect(res.body).to.not.be.an('array');
         done();
        });
      });
  });


  /////////////////Adding user to a group route/////////////////////////
///////////////////////////////////////////////////////////

describe('Adding user to a group route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2', email: 'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should add user to a group',function(done){
      api.post('/api/addusertogroup')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        user: 'Test2', group: 'testgroup'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       
       done();
      });
    });
    it('should add user to a group and not return any unexpected parameters',function(done){
        api.post('/api/addusertogroup')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          user: 'Test2', group: 'testgroup'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
      
         expect(res.body).to.not.be.an('array');
         done();
        });
      });
  });

   /////////////////Assigning user a group assis role/////////////////////////
///////////////////////////////////////////////////////////

describe('Assigning user a groupassis role route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2', email: 'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should add group assis role to a user',function(done){
      api.post('/api/assignusergroupassis')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        user: 'Test2'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should add group assis role to a user with no errors',function(done){
        api.post('/api/assignusergroupassis')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          user: 'Test2'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.be.an('error');
         done();
        });
      });
  });

    /////////////////Adding user a role/////////////////////////
///////////////////////////////////////////////////////////

describe('Assigning user a role route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2', email: 'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should add a role to a user',function(done){
      api.post('/api/assignuserrole')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        user: 'Test2', role:'Group Admin'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should add a role to a user with no errors',function(done){
        api.post('/api/assignuserrole')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          user: 'Test2', role:'Group Admin'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.be.an('error');
         done();
        });
      });
  });

/////////////////Authentication route/////////////////////////
///////////////////////////////////////////////////////////

describe('Authenticating a user route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test2', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should authenticate a user',function(done){
      api.post('/api/auth')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        username: 'Saad', password:'123'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should not authenticate a user',function(done){
        api.post('/api/auth')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          username: 'Test2', password:'124'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

  /////////////////Creating a channel route/////////////////////////
///////////////////////////////////////////////////////////

describe('Creating a new channel route',()=>{
    before(function(){
        api.post('/api/creategroup')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            newgroup:'TestGroup2'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removegroupzzz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            group: 'TestGroup2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should create a channel in a group',function(done){
      api.post('/api/createchannel')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        group: 'TestGroup2', channel:'test2channel'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should display an error for pre existing channel',function(done){
        api.post('/api/createchannel')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          group: 'TestGroup2', channel:'test2channel'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

/////////////////Creating a group route/////////////////////////
///////////////////////////////////////////////////////////

describe('Creating a group route',()=>{
    before(function(){
    
});
    after(function(){
        api.post('/api/removegroupzzz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            group: 'TestGroup2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should create a group',function(done){
      api.post('/api/creategroup')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        newgroup: 'TestGroup2'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should display an error for pre existing group',function(done){
        api.post('/api/creategroup')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
        newgroup: 'TestGroup2'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

  /////////////////Creating a user route/////////////////////////
///////////////////////////////////////////////////////////

describe('Creating a user route',()=>{
    before(function(){
    
});
after(function(){
    api.post('/api/removeuser')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        user: 'Test2'
    })
     .end(function(err,res){
       if (err) throw err;
     });
});
    it('should create a user',function(done){
      api.post('/api/createuser')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        user:'Test2', email:'test123@gmail.com',password:'123'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should display an error for pre existing user',function(done){
        api.post('/api/createuser')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
        user:'Test2', email:'test123@gmail.com',password:'123'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

   /////////////////Getting channels route/////////////////////////
///////////////////////////////////////////////////////////

describe('Getting channels route',()=>{
    before(function(){
    
});
after(function(){
  
});
    it('should get all channels',function(done){
      api.get('/api/getchannels')
    .set('Accept','application/x-www-form-urlencoded')
   
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should get all channels with no errors',function(done){
        api.get('/api/getchannels')
      .set('Accept','application/x-www-form-urlencoded')
     
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.have.property('error');
         done();
        });
      });
  });

    /////////////////Getting groups route/////////////////////////
///////////////////////////////////////////////////////////

describe('Getting groups route',()=>{
    before(function(){
    
});
after(function(){
  
});
    it('should get all groups',function(done){
      api.get('/api/getgroups')
    .set('Accept','application/x-www-form-urlencoded')
   
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should get all channels with no errors',function(done){
        api.get('/api/getgroups')
      .set('Accept','application/x-www-form-urlencoded')
     
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.have.property('error');
         done();
        });
      });
  });

    /////////////////Getting users route/////////////////////////
///////////////////////////////////////////////////////////

describe('Getting channels route',()=>{
    before(function(){
    
});
after(function(){
  
});
    it('should get all users',function(done){
      api.get('/api/getusers')
    .set('Accept','application/x-www-form-urlencoded')
   
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should get all users with no errors',function(done){
        api.get('/api/getusers')
      .set('Accept','application/x-www-form-urlencoded')
     
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.have.property('error');
         done();
        });
      });
  });

      /////////////////Getting history route/////////////////////////
///////////////////////////////////////////////////////////

describe('Getting history route',()=>{
    before(function(){
        api.post('/api/createchannelz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            channel:'testchannel'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
after(function(){
    api.post('/api/removechannelzz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            channel:'testchannel'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    it('should get history',function(done){
      api.post('/api/showhistory')
    .set('Accept','application/x-www-form-urlencoded')
     .send({channel:'testchannel'})
     .end(function(err,res){
       if (err) throw err;
       expect(res.body).to.not.equal(null);
       //expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should get history with no errors',function(done){
        api.get('/api/showhistory')
      .set('Accept','application/x-www-form-urlencoded')
      .send({channel:'testchannel'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.have.property('error');
         done();
        });
      })
  });

  /////////////////Get a user data route/////////////////////////
///////////////////////////////////////////////////////////

describe('Get user data route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test2', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should get user data',function(done){
      api.post('/api/groups')
    .set('Accept','application/x-www-form-urlencoded')
    .send({
        username: 'Test2'
    })
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should not get user data',function(done){
        api.post('/api/groups')
      .set('Accept','application/x-www-form-urlencoded')
      .send({
          username: 'Test3'
      })
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.be.an('error');
         done();
        });
      });
  });

    /////////////////Getting a user route/////////////////////////
///////////////////////////////////////////////////////////

describe('Getting a user route',()=>{
    before(function(){
        api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test2', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
    });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should get all users',function(done){
      api.post('/api/read')
    .set('Accept','application/x-www-form-urlencoded')
     .send({username:'Test2'})
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.be.an('object');
       done();
      });
    });
    it('should get all users with no errors',function(done){
        api.post('/api/read')
      .set('Accept','application/x-www-form-urlencoded')
      .send({username:'Test2'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.have.property('error');
         done();
        });
      });
  });

/////////////////Recording history route/////////////////////////
///////////////////////////////////////////////////////////

describe('Recording history route',()=>{
    before(function(){
        api.post('/api/createchannelz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            channel: 'testchannel'
        })
         .end(function(err,res){
           if (err) throw err;
    });
    api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test2', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
         });
});
    after(function(){
        api.post('/api/removechannelzz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            channel: 'testchannel'
        })
         .end(function(err,res){
           if (err) throw err;
         });
         api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should record history of a channel',function(done){
      api.post('/api/recordhistory')
    .set('Accept','application/x-www-form-urlencoded')
     .send({user:'Test2',message:'This is history',dateTime:'23/09/2019',channel:'testchannel'})
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.be.an('object');
       done();
      });
    });
    it('should not record history',function(done){
        api.post('/api/recordhistory')
      .set('Accept','application/x-www-form-urlencoded')
      .send({user:'Test2',message:'This is history',dateTime:'23/09/2019',channel:'testchannelz'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

      /////////////////Removing channel route/////////////////////////
///////////////////////////////////////////////////////////

describe('Removing channel route',()=>{
    before(function(){
        api.post('/api/createchannelz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            channel: 'testchannel'
        })
         .end(function(err,res){
           if (err) throw err;
    });
 
});
    after(function(){
        api.post('/api/removechannelzz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({channel:'testchannel'})
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should remove a channel',function(done){
      api.post('/api/removechannelzz')
    .set('Accept','application/x-www-form-urlencoded')
     .send({channel:'testchannel'})
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should remove a channel with no errors',function(done){
        api.post('/api/removechannelzz')
      .set('Accept','application/x-www-form-urlencoded')
      .send({channel:'testchannel'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.be.an('error');
         done();
        });
      });
  });
 
      /////////////////Removing group route/////////////////////////
///////////////////////////////////////////////////////////

describe('Removing group route',()=>{
    before(function(){
        api.post('/api/creategroup')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            newgroup: 'testgroup'
        })
         .end(function(err,res){
           if (err) throw err;
    });
 
});
    after(function(){
        api.post('/api/removegroupzzz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({group:'testgroup'})
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should remove a group',function(done){
      api.post('/api/removegroupzzz')
    .set('Accept','application/x-www-form-urlencoded')
     .send({group:'testgroup'})
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should remove a group with no errors',function(done){
        api.post('/api/removegroupzzz')
      .set('Accept','application/x-www-form-urlencoded')
      .send({group:'testgroup'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.not.be.an('error');
         done();
        });
      });
  });  

  /////////////////Remove user from channel route/////////////////////////
///////////////////////////////////////////////////////////

describe('Remove user from channel route',()=>{
    before(function(){
   
    api.post('/api/createuserz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test2', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
         });
});
    after(function(){
    
         api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should remove user from a channel',function(done){
      api.post('/api/removeuserfromchannel')
    .set('Accept','application/x-www-form-urlencoded')
     .send({user:'Test2',channel:'testchannel'})
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(false);
       done();
      });
    });
    it('should not remove user from a channel',function(done){
        api.post('/api/recordhistory')
      .set('Accept','application/x-www-form-urlencoded')
      .send({user:'Test2',channel:'testchannelz'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

    /////////////////Remove user from group route/////////////////////////
///////////////////////////////////////////////////////////

describe('Remove user from group route',()=>{
    before(function(){
   
    api.post('/api/createuserz')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test3', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
         });
});
    after(function(){
    
         api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test3'
        })
         .end(function(err,res){
           if (err) throw err;
         });
    });
    it('should remove user from a group',function(done){
      api.post('/api/removeuserfromgroup')
    .set('Accept','application/x-www-form-urlencoded')
     .send({user:'Test3',group:'testgroup'})
     .end(function(err,res){
       if (err) throw err;
       //expect(res.body).to.not.equal(null);
       expect(res.body).to.have.property('valid').equal(false);
       done();
      });
    });
    it('should not remove user from a group',function(done){
        api.post('/api/removeuserfromgroup')
      .set('Accept','application/x-www-form-urlencoded')
      .send({user:'Test3',channel:'testgroup'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });

//////////////////Remove user route/////////////////////////
///////////////////////////////////////////////////////////

describe('Remove user route',()=>{
    before(function(){
   
    api.post('/api/createuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user:'Test2', email:'test123@gmail.com',password:'123'
        })
         .end(function(err,res){
           if (err) throw err;
         });
});
    after(function(){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         });
     
    });
    it('should remove a user',function(done){
        api.post('/api/removeuser')
        .set('Accept','application/x-www-form-urlencoded')
        .send({
            user: 'Test2'
        })
         .end(function(err,res){
           if (err) throw err;
         
       expect(res.body).to.not.equal(null);
       //expect(res.body).to.have.property('valid').equal(true);
       done();
      });
    });
    it('should not remove user',function(done){
        api.post('/api/removeuser')
      .set('Accept','application/x-www-form-urlencoded')
      .send({user:'Test3'})
       .end(function(err,res){
         if (err) throw err;
         //expect(res.body).to.not.equal(null);
         expect(res.body).to.have.property('valid').equal(false);
         done();
        });
      });
  });