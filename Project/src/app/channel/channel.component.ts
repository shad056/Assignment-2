import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }
 channel;
 private postSub: Subscription;
  ngOnInit() {
   this.postSub = this.route.paramMap.subscribe(
      params => {this.channel = params.get('channel');}
    );
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
