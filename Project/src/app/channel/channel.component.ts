import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { MetaService } from '../services/meta.service';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private metaService:MetaService) { }
 channel;
 messages = [];
 private postSub: Subscription;
  ngOnInit() {
   this.postSub = this.route.paramMap.subscribe(
      params => {this.channel = params.get('channel');}
    );
    this.metaService.ShowHistory(this.channel).subscribe(res => {
      for(var i=0;i<res.result.length;i++) {
        for(var j=0;j<res.result[i].history.length;j++) {
        this.messages.push(res.result[i].history[j]);
      
        }
      }
    });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
