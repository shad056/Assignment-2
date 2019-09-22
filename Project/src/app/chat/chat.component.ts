

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
  messages:Array<{user:String,message:String}> = [];
  message;
  connection;
  channel;
  private postSub: Subscription;
  constructor(private sockServ: SocketService, private router: Router, private form:FormsModule, private metaService: MetaService,private httpService: HttpClient,private route: ActivatedRoute) { }

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
  
    this.joinChannel();
   
   this.userJoinedChannel();

   this.userLeftRoom();
    // this.connection = this.sockServ.getMessages().subscribe(message=>{
    // //"message" is value of input field.
    // this.messages.push(message);
    // this.message = '';
    // });
    this.sockServ.newMessageReceived()
        .subscribe(data=>this.messages.push(data));
       
      

    }
  }
  joinChannel() {
    this.sockServ.joinRoom({user:this.username, channel:this.channel});
   
    console.log("Session started for: " + this.username);
  }
  userJoinedChannel() {
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
  userLeftRoom() {
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
    this.sockServ.sendMessage({user:this.username, channel:this.channel, message:this.message});
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
  logout(){
    this.sockServ.leaveRoom({user:this.username, channel:this.channel});
    console.log('Leaving the chat channel');
    localStorage.removeItem("channel");
    this.router.navigateByUrl('account');
  }
  ChannelHistory(a,b,c,d) {
    this.metaService.RecordHistory(a,b,c,d).subscribe(res => {

    });
  }

}
