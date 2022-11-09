import { Component, OnInit } from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {Observable} from "rxjs";

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: ['./overview1.component.css']
})
export class Overview1Component implements OnInit {
  public aEvents: AEvent[];

  constructor() {

  }

  ngOnInit(): void {













    this.aEvents = [];
    for (let i = 0; i < 9 ; i++) {
      this.addEvent();
    }
  }

  addEvent(){
    this.aEvents.push(AEvent.createSampleAEvent(this.nextId()));
  }

  private nextId() {
    if (this.aEvents.length == 0){
      return 20001;
    }else{
      return this.aEvents[this.aEvents.length-1].id+3;
    }
  }
}
