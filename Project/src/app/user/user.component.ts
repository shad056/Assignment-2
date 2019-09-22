import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MetaService} from '../services/meta.service';
import{HttpClient} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: MetaService, private http: HttpClient) { }
  private postSub: Subscription;
  id; //this is used to store the id of the received parameter from the url
  uname; //this is used to store the username from the user input
  email; //this is used to store the email from the user input
  errors; //this is used to render the errors, whether to display them or not
  error; //this is used to store the string for the error message to display
  success; //this is used to render the success message, whether to display it or not
  successmsg; //this is used to store the success message string
  selectchannel = ''; //this is used to store the selected channel from the drop down on the client side - html file
  channels = []; //this is used to store all the channels received from the server side
  selectuser = ''; //this is used to store the selected user from the drop down on the client side - html file
  selectrole = ''; //this is used to store the selected role from the drop down on the client side - html file
  users; // this is used to store all the users received from the server side
  groups = []; //this is used to store all the groups received from the server side
  selectgroup = ''; //this is used to store the selected group from the drop down on the client side - html file
  channelz = []; //this is used to store all the channels received from the server side
  selectchannelz; //this is used to store the selected channel from the drop down on the client side - html file
  roles = ['Group Admin', 'Super Admin'];
  password;
  groupz;

  ngOnInit() {
    this.postSub = this.route.paramMap.subscribe( 
      params => {this.id = params.get('id');}
    ); //Subscription for receiving the parameters from the url
    this.service.AllChannels().subscribe(res => {
      if(res.valid === true) {
        this.channels = res.channel;
    
      }
    }); //Calling the service to load all the available channels
    this.service.AllUsers().subscribe(res => {
      if(res.valid === true) {
        this.users = res.user;
      }
    }); //Calling the service to load all the available users
    this.service.AllGroups().subscribe(res => {
      if(res.valid === true) {
      this.groups = res.group;
      }
    }); //Calling the service to load all the available groups
  
  }
  ngOnDestroy() {
    this.postSub.unsubscribe(); //unsubscribing to the service
  }
  CreateUser() { //Create a new user
    if(this.uname === undefined || this.uname === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a valid user name';
    }
    else if (this.email === undefined || this.email === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a valid user email address';
    }
    else if (this.password === undefined || this.password === '') {
      this.success = false;
      this.errors = true;
        this.error = 'Please enter a valid password';
    }
    else {
      this.service.AddUser(this.uname,this.email,this.password).subscribe(res => {
        if(res.valid===true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.uname + ' has been successfully added';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'User already exists, Please try again';
        }
      });
    }
  }
  onUserAddtoChannel() { //this function adds the user to a channel
    if(this.selectchannelz === '' || this.selectchannelz === undefined || this.selectchannelz === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid channel';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
    else {
      this.service.AddUsertoChannel(this.selectuser,this.selectchannelz).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully added to the channel ' + this.selectchannel;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'User already is added to this channel, Please try again';
        }
      });
    }
  }

  onUserClick(user: any) { //this renders the channels available within the associated group/s of the selected user, therefore
    //when a user is selected from the drop down on the client side, this function is called to render the channels
    this.channelz = [];
      this.http.post<any>('http://localhost:3000/api/usergroupchannels', {username:user}).subscribe(res => {
        if(res.valid == true) {
          this.groupz = res.group;
          for(var i=0;i<this.groupz.length;i++) {
            this.http.post<any>('http://localhost:3000/api/usergroupchannelz',{group:this.groupz[i]}).subscribe(result => {
            if(result.valid === true) {
              for(var i=0;i<result.channel.length;i++)
              this.channelz.push(result.channel[i]);
            }

            });
          }
        }
      },
        (err: HttpErrorResponse) => {console.log(err.error); }
      );
  }

  RemoveUserfromChannel() { //this function removes a user from the channel
    if(this.selectchannel === '' || this.selectchannel === undefined || this.selectchannel === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid channel';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
    else {
      this.service.RemoveUserfromChannel(this.selectuser,this.selectchannel).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully removed from the channel ' + this.selectchannel;
          setTimeout(function(){ location.reload(); }, 3000);
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectchannel + ' is not added to ' + this.selectuser;
        }
      });
    }
  }

  RemoveUser() { //this route removes a user
    if(this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.RemoveUser(this.selectuser).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully removed';
          setTimeout(function(){ location.reload(); }, 3000);
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = 'User cannot be removed';
        }
      });
    }
  }
  AssignUserGroupAssis() { //this route assigns the user with a group assis role
    if(this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.selectrole = "Group Assis";
      this.service.AssignUserGroupAssis(this.selectuser,this.selectrole).subscribe(res => {
        if(res.valid===true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully assigned the role of Group Assis ';
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' has already been assigned the role of Group Assis'
        }
      });
    }
  }

  AssignUserRole() { //assign the user with a role
    if(this.selectrole === '' || this.selectrole === undefined || this.selectrole === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid role';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.AssignUserRole(this.selectuser, this.selectrole).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully assigned the role of ' + this.selectrole;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' has already been assigned the role of ' + this.selectrole;
        }
      });
    }
  }

  AddUserGroup() { //add the user within a group
    if(this.selectgroup === '' || this.selectgroup === undefined || this.selectgroup === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid group';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.AddUsertoGroup(this.selectuser, this.selectgroup).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully been added to the group ' + this.selectgroup;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' has already been added to the group ' + this.selectgroup;
        }
      });
    }
  }

  RemoveUserFromGroup() { //remove the user from a group
    if(this.selectgroup === '' || this.selectgroup === undefined || this.selectgroup === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid group';
    }
    else if (this.selectuser === '' || this.selectuser === undefined || this.selectuser === null) {
      this.success = false;
          this.errors = true;
          this.error = 'Please select a valid user';
    }
   
    else {
      this.service.RemoveUserFromGroup(this.selectuser, this.selectgroup).subscribe(res => {
        if(res.valid==true){
          this.errors = false;
          this.success = true;
          this.successmsg = this.selectuser + ' has been successfully been removed from the group ' + this.selectgroup;
        }
        else {
          this.success = false;
          this.errors = true;
          this.error = this.selectuser + ' is not part of the group ' + this.selectgroup;
        }
      });
    }
  }

}
