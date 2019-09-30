
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {Router} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { MetaService } from '../meta.service';



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = "http://localhost:3000";
  private socket;
  private apiURL = 'http://localhost:3000/api/';
  channel;
  constructor(private router: Router, private form:FormsModule, private httpService: HttpClient, private metaService: MetaService) {this.socket = io(this.url); }
  // sendMessage(message){
  //   this.socket.emit('add-message',message);
  // }
  joinRoom(data)
  {
      this.socket.emit('join',data);
  }

  newUserJoined()
  {   
      let observable = new Observable<{user:String, message:String,image:String}>(observer=>{
          //emit the new user joint event
              this.socket.on('join', (data)=>{	
              
              //if data is received pass it on
              observer.next(data);
          }); //if any errors than disconnect the socket
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
}

userLeftRoom(){
  let observable = new Observable<{user:String, message:String,image:String}>(observer=>{
      this.socket.on('leave', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
}
  // getMessages() {
  //   let obmessages = new Observable (
  //     //"observer" is a javascript object that defines the handlers for the
  //     //notifications that we will receive
  //    observer =>{
  //    this.socket = io(this.url);
  //    //listen for "newmessage" event from the server
  //    this.socket.on('message', (date)=> {observer.next(date);});
  //    //when the observer ends {unsubscribed} then disconnect the socket.
  //    return ()=>{this.socket.disconnect();}
  //    })
  //   return obmessages;
    
  // }
  

  sendImage(image) {
    this.socket.emit('add-image', image);
  
  }
  sendMessage(data)
    {
        this.socket.emit('add-message',data);
    }
    newMessageReceived(){
      let observable = new Observable<{user:String, message:String,image:String}>(observer=>{
          this.socket.on('new message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  newImageReceived(){
    let observable = new Observable<{user:String, message:String,image:String}>(observer=>{
        this.socket.on('new image', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
}

  getImages() {
    let obmessage = new Observable(


      observer => {
        this.socket = io(this.url);


        this.socket.on('image', (date) => { observer.next(date); });


        return () => { this.socket.disconnect(); }


      });
    return obmessage;

  }
 
}
