import { MetaService } from './../services/meta.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private metaService: MetaService, private http: HttpClient) { }
  uname: string
 
  error: string

  validuser = 'false';
  errors = false;
  users;
  group;
  password;
  private postSub: Subscription;
  onSubmit() {  //this function authenticates the user by calling the request from the server side and checking against the values in the JSON
    //file to match any available users, once the user is found navigate them to the account component and store there details in the localStorage
 
  
    this.metaService.Authenticate(this.uname, this.password).subscribe(res => {this.users = res
  
    if(this.users.valid == false) {
      this.error= 'User is not valid';
      this.errors = true;
    }
    else {
      if(typeof(Storage) !== "undefined") {
        console.log('Storage ready');
        localStorage.setItem("userdetails",JSON.stringify(this.users));


      }
      else {
        console.log('No storage support');
      }
      this.router.navigateByUrl('/account');
    }
  },
    (err: HttpErrorResponse) => {console.log(err.error); } );

    // }
    // if(this.validuser == 'false') {

    // }




  }
  ngOnInit() {
    localStorage.removeItem("userdetails"); //remove user details from the local storage once this components loads, in
    //order to prompt the user to log in again
  }
  
}
