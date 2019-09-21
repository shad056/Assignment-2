import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab';
  login = false;
  constructor(private router: Router) {}
  ngOnInit() {
    if(localStorage.getItem("userdetails") !== null) {
      this.login=true;
     }
    this.router.navigateByUrl('/login');
  }
  LogOut() {
    localStorage.removeItem("userdetails");
    this.login = false;

  }
}
