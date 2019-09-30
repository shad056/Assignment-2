import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MetaService} from '../services/meta.service';
import{HttpClient} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: MetaService, private http:HttpClient) { }
  private postSub: Subscription; //Subscribing to the receiving parameters from the url and unsuscribing such service upon closing/destroying of this component
  id; //this variable stores the received parameter from the account component
  groupname; //this variable stores the group name from the user input 
  channelname; //this variable stores the channel name from the user input 
  errors = false; //this is used to trigger the errors whether to display them or not
  error; //this stores the message for the error to display
  success = false; //this is used to display the success messages
  successmsg; //this stores the string for the success messages
  groups = []; //this is used to store all the groups
  selectgroup = ""; //this stores the selected group from the drop down on client side
  selectchannel = ''; //this stores the selected channel from the drop down on the client side
  channels = []; //this stores all the channels 
  channelz = [];
  ngOnInit() {
    this.postSub = this.route.paramMap.subscribe(
      params => {this.id = params.get('id');} 
    ); //Subscription for receiving the parameters from the url
    this.service.AllGroups().subscribe(res => { //calling the service to receive all available groups in the JSON file
      if(res.valid === true) {
      this.groups = res.group;
      }
    });
    this.service.AllChannels().subscribe(res => { //calling the service to receive all available channels in the JSON file
      if(res.valid === true) {
        this.channels = res.channel;
      }
    })
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
  CreateGroup() { //this function is used to create a new group
    if(this.groupname === undefined || this.groupname === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a group name';
    }
    else {
    this.service.AddGroup(this.groupname).subscribe(res => {
      if(res.valid===true){
        this.errors = false;
        this.success = true;
        this.successmsg = this.groupname + ' has been successfully added';
      }
      else {
        this.success = false;
        this.errors = true;
        this.error = 'Group already exists, Please try again';
      }
    });
  }
  }
  CreateChannel() { //this function creates a new channel
    if(this.selectgroup === "" || this.selectgroup === undefined) {
      this.success = false;
      this.errors = true;
        this.error = 'Group is not selected';
    }
    else if(this.channelname === undefined || this.channelname === '') {
      this.success = false;
      this.errors = true;
      this.error = 'Please enter a valid channel name';
    }
    else {
    this.service.AddChannel(this.selectgroup, this.channelname).subscribe(res => {
      if(res.valid===true){
        this.service.AddChannelz(this.channelname).subscribe(ress => {
        if(ress.valid === true) {
          this.errors = false;
        this.success = true;
        this.successmsg = this.channelname + ' has been successfully added to the group ' + this.selectgroup;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'Channel already exists, Please try again';
        }
        });
      }
      else {
        this.success = false;
        this.errors = true;
        this.error = 'Channel already exists, Please try again';
      }
        

    });
    }
  }
  RemoveGroup() { //this function removes a group
    if(this.selectgroup === "" || this.selectgroup === undefined) {
      this.success = false;
      this.errors = true;
        this.error = 'Group is not selected';
    }
    else {
      this.service.RemoveGroup(this.selectgroup).subscribe(res => {
        this.channelz = res.channel;
        if(this.channelz.length === 0) {
          this.http.post<any>('http://localhost:3000/api/removegroupzz', {group:this.selectgroup}).subscribe(resss => {
            if(resss.valid === true) {
              this.http.post<any>('http://localhost:3000/api/removegroupzzz', {group:this.selectgroup}).subscribe(ressss => {
                if(ressss.valid===true){
                  this.errors = false;
                  this.success = true;
                  this.successmsg = this.selectgroup + ' has been successfully removed ';
                  setTimeout(function(){ location.reload(); }, 3000);
                }
                else {
                  this.success = false;
                  this.errors = true;
                  this.error = 'Group doesnt exists, Please try again';
                }
            
            });
            }  
            
            });
        }
        else {
        for(var i=0;i<this.channelz.length;i++) {
          this.http.post<any>('http://localhost:3000/api/removegroupz', {channel:this.channelz[i], group:this.selectgroup}).subscribe(ress => {
          if(ress.valid === true) {
            this.http.post<any>('http://localhost:3000/api/removegroupzz', {group:this.selectgroup}).subscribe(resss => {
            if(resss.valid === true) {
              this.http.post<any>('http://localhost:3000/api/removegroupzzz', {group:this.selectgroup}).subscribe(ressss => {
                if(ressss.valid===true){
                  this.errors = false;
                  this.success = true;
                  this.successmsg = this.selectgroup + ' has been successfully removed ';
                  setTimeout(function(){ location.reload(); }, 3000);
                }
                else {
                  this.success = false;
                  this.errors = true;
                  this.error = 'Group doesnt exists, Please try again';
                }
            
            });
            }  
            
            });
          }

        });
        }
      }
  
      });
      }
  }
  RemoveChannel() { //this function removes a channel
    if(this.selectchannel === "" || this.selectchannel === undefined) {
      this.success = false;
      this.errors = true;
        this.error = 'Channel is not selected';
    }
    else {
      this.service.RemoveChannel(this.selectchannel).subscribe(res => {
        if(res.valid===true){
          this.service.RemoveChannelz(this.selectchannel).subscribe(ress => {
            if(ress.valid===true) {
                  this.errors = false;
              this.success = true;
              this.successmsg = this.selectchannel + ' has been successfully removed ';
              setTimeout(function(){ location.reload(); }, 3000);
              // this.service.RemoveChannelzz(this.selectchannel).subscribe(resss => {
              //   if(resss.valid===true) {
              //     this.errors = false;
              // this.success = true;
              // this.successmsg = this.selectchannel + ' has been successfully removed ';
              // setTimeout(function(){ location.reload(); }, 3000);
              //   }
              //   else {
              //     this.success = false;
              //     this.errors = true;
              //     this.error = 'Channel doesnt exists, Please try again';
              //   }
              // });    
              
            }
            else {
              this.success = false;
              this.errors = true;
              this.error = 'Channel doesnt exists, Please try again';
            }
          });
         
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'Channel doesnt exists, Please try again';
        }
       
  
      });
      }
  }  

}
