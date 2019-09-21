import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MetaService} from '../services/meta.service';
import { HttpErrorResponse } from '@angular/common/http';
import{HttpClient} from '@angular/common/http';
import { dataModel } from '../services/Models/dataModel';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
   username; //This variable is used to store the username of the user from the localStorage
   group = []; //All the groups associated with the user are stored in this array
   channels = []; //All the channels associated with the user are stored in this array
   roles = []; //All the roles associated with the user are stored in this array
   selectgroup = ""; //This is the selected group from the drop down on the client side - from the html file that the user selects
   selectchannel = ""; //This is the selected channel from the drop down on the client side - from the html file that the user selects
   error = false; //this is used to trigger the display of errors through true/false
   errors = ''; //this stores the string as an error message to be rendered on the client side
   groupadmin = false; //this is used to check if a user is a group admin or not
   superadmin = false; //this is used to check if a user is a super admin or not
   groupassis = false; //this is used to check if a user is a group assis or not

  constructor(private router: Router, private service: MetaService, private http: HttpClient) { }

  ngOnInit() {

   if(localStorage.getItem("userdetails") === null) {
    this.router.navigateByUrl('/login'); //if the localstorage is empty then redirect the user back to the login page
   }
   else {
   var user = JSON.parse(localStorage.getItem("userdetails")); //store the user details in the user variable
    this.username = user.username; //fetch only the username of the logged in user
    this.service.LoadGroups(this.username).subscribe(res => { //Calling the service to load all groups,channels and roles associated with the logged in user
      if(res.valid == false) {
        this.group = null;
      }
      else {
        
        this.group = res.group;
        this.channels = res.channel;
        //this.group.push('Custom Channel Group');
        this.roles = res.role;  
        //Checking the roles of the logged in user to render/display controls on the view/html page
        for (let role of this.roles) {
          if(role == 'Group Admin') {
            this.groupadmin = true;
          }
          if(role == 'Group Assis') {
            this.groupassis = true;
          }
          if(role == 'Super Admin') {
            this.superadmin = true;
          }

      }
  
      }
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
    );
   }
  }
  onLogOut(){ 
    localStorage.removeItem("userdetails"); //Once the user presses the log out button, clear the local storage session
    this.router.navigateByUrl('/login');
  }
  //onGroupClick(group: any) {
   // if(group == 'Custom Channel Group') {
 
   // }
    // else {
    // this.http.post<dataModel>('http://localhost:3000/api/channels', {chosengroup: group}).subscribe(
    //   res => {
    //     if(res.valid == true) {
    //       this.channels = res.channel;
          
    //     }
    //     else {
    //       this.channels = null;
         
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log (err.message);
    //   }
    // );
    // }
  //}
  onChannelClick() { //Once the user clicks the display channel history button, navigate to the history for the selected channel
    if(this.selectchannel == '') {
      this.error = true;
      this.errors = 'Please select a channel first';
    }
    else {
    this.router.navigateByUrl('/channelhistory/' + this.selectchannel);
    }
  }
  onChatClick() { //Once the user clicks the goto chat button, navigate to the chat page within the selected channel
    if(this.selectchannel == '') {
      this.error = true;
      this.errors = 'Please select a channel first';
    }
    else {
    this.router.navigateByUrl('/chat/' + this.selectchannel);
    }
  }
 
  onGotoUserComponent(event) { //Operations involving users navigates to the user component
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id.nodeValue;
    this.router.navigateByUrl('/user/' + id);
  }
  // onUserAddtoChannel(event) {
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var id = target.attributes.id.nodeValue;
  //   this.router.navigateByUrl('/user/' + id);
  // }
 
  onGotoGroupComponent(event) { //Operations involving groups navigates to the group component
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id.nodeValue;
    this.router.navigateByUrl('/group/' + id);
  }
}
