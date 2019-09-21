import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {

  constructor(private route: ActivatedRoute) { }
 channel;
 private postSub: Subscription;
  ngOnInit() {
   this.postSub = this.route.paramMap.subscribe(
      params => {this.channel = params.get('channel');} 
    ); //Subscription for receiving the parameters from the url
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}