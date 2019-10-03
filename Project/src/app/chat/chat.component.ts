

import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from '../services/socket/socket.service';
import {Router} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { MetaService } from '../services/meta.service';
import { ImgUploadService } from '../services/Img/img-upload.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private apiURL = 'http://localhost:3000/api/';
  username: string
 imgz = [];
  message;
  connection;
  channel;
  private postSub: Subscription;
  selectedFile:File=null;
  imagepath="";
  imagepathz="";
  img = false;
  messages:Array<{user:String,message:String,image:String}> = [];
  constructor(private sockServ: SocketService, private router: Router, private form:FormsModule, private metaService: MetaService,private httpService: HttpClient,private route: ActivatedRoute,private imgUploadService:ImgUploadService) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("userdetails")); //store the user details in the user variable
    this.username = user.username; //fetch only the username of the logged in user
    this.postSub = this.route.paramMap.subscribe(
      params => {this.channel = params.get('channel');}
    );
    //Check for valid user and subscribe to service (chat messages)
    if (!user) {
        //No valid session is available
       console.log('Not validated');
       localStorage.clear();
       alert("Not a valid user");
       this.router.navigateByUrl('login');

    }else {
     //We have a valid username. Subscribe to chat service and add chat message
    //to the message array each time you are pushed a message from the server.
    this.LoadImage(this.username); //this function loads the profile picture of the user
   // this.joinChannel();
   
   this.userJoinedChannel();  //the user joins the channel
   

   this.userLeftRoom(); //this allows the user to leave the room
    // this.connection = this.sockServ.getMessages().subscribe(message=>{
    // //"message" is value of input field.
    // this.messages.push(message);
    // this.message = '';
    // });
    // this.httpService.get(this.apiURL + 'read')
    //     .subscribe((data: any) => {
    //       for (var i = 0; i < data.length; i++) {
    //         if (data[i].user === this.username) {
    //           this.imagepath = data[i].image;
            
    //         }
    //       }
    //     });
    this.sockServ.newMessageReceived() //constantly look for new messages
        .subscribe(data=>this.messages.push(data));
      this.sockServ.newImageReceived() //constantly look for any image uploads
      .subscribe(data=>this.imgz.push(data));
      

    }
  }

  async LoadImage(username) { //this loads the image/profile picture of the user by retrieving the image name and rendering the server image
    await this.httpService.post(this.apiURL + 'read',{username:username})
   .subscribe((data: any) => {
     for (var i = 0; i < data.length; i++) {
       if (data[i].user === this.username) {
         this.imagepath = data[i].image;
         this.joinChannel(); //after the image is read the user joins the room
       }
     }
   });
  }
   joinChannel() { //the user joins the channel with a message and emits its username, profile picture to the channel chat room
   
     this.sockServ.joinRoom({user:this.username, channel:this.channel,image:this.imagepath});
   
    console.log("Session started for: " + this.username);
  }
  userJoinedChannel() { //once the user has joined, it receives the emitted data from the server and pushes it to an array
    this.sockServ.newUserJoined() //constructor has suscribed to this event and when event is received push it on to the messageArray
    .subscribe(data=> {this.messages.push(data)
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+' '+time;
              this.metaService.RecordHistory(data.user,data.message,dateTime, this.channel).subscribe(res => {
              
              });
            }
    );
  }
  userLeftRoom() {  //this allows the user to leave the room and also emit a leave channel message
    
    this.sockServ.userLeftRoom()
    .subscribe(data=> {
              this.messages.push(data)
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+' '+time;
              this.metaService.RecordHistory(data.user,data.message,dateTime, this.channel).subscribe(res => {
              
              });
    });
  }
  sendMessage() {
    //Send a chat message back to the server
    // this.sockServ.sendMessage(this.message + '('+this.username+')');
    
    this.sockServ.sendMessage({user:this.username, channel:this.channel, message:this.message, image:this.imagepath});
    var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+' '+time;
    this.ChannelHistory(this.username,': '+ this.message, dateTime, this.channel);
  }
  ngOnDestroy() {
    //When leaving this component close down the subscription
    if(this.connection) {
      this.connection.unsubscribe();
    }
    this.postSub.unsubscribe();
  }
  logout(){ //this allows the user to log out and leave the room
    this.sockServ.leaveRoom({user:this.username, channel:this.channel,image:this.imagepath});
    console.log('Leaving the chat channel');
    localStorage.removeItem("channel");
    this.router.navigateByUrl('account');
  }
  ChannelHistory(a,b,c,d) { //channel history is recorded through sending a post request to server to store history details in the database
    this.metaService.RecordHistory(a,b,c,d).subscribe(res => {

    });
  }

  OnFileSelected(event){ //allows to select a file on the client side
    this.selectedFile = <File>event.target.files[0];
   }

   imageObj: any = {};
  OnUpload() { //the selected file is uploaded on a server folder and further more the image name is emitted and received in the channel to call the image from the server to be displayed in the channel
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.imgUploadService.imguploads(fd).subscribe(res=>{
     this.imagepathz = res.data.filename;
     var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+' '+ time;
              
              this.img=true;
     this.sockServ.sendImage({user:this.username, channel:this.channel, message:this.imagepathz, image:this.imagepath});
     this.metaService.RecordHistory(this.username,' uploaded an image: ' + this.imagepathz,dateTime, this.channel).subscribe(res => {
              
    });
    });
     
     //this.imageObj = {username: this.username, imagename: this.imagepath}
    //  this.httpService.post(this.apiURL + 'addImage', JSON.stringify(this.imageObj), httpOptions )
    //    .subscribe((data: any) => {
    //      if (data === true) {
    //        alert("image uploaded succesfully");
    //      } else {
    //        alert("error");
    //      }
    //    });
    
 
}
}
