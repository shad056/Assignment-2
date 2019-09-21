import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: Router) { }
  username;
  email;
  dob;
  age;

  onEdit() {
    var user = {username: this.username, email: this.email, dob: this.dob, age: this.age}
    sessionStorage.setItem("userdetails",JSON.stringify(user));
    this.route.navigateByUrl('/account');
  }
  ngOnInit() {

    if(sessionStorage.getItem("userdetails") === null) {
      this.route.navigateByUrl('/login');
    }
    else {
    var user = JSON.parse(sessionStorage.getItem("userdetails"));
    this.username = user.username;
    this.email = user.email;
    this.dob = user.dob;
    this.age = user.age;
    }
  }


}
