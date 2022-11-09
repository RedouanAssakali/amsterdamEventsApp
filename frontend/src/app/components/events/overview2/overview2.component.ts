import { Component, OnInit } from '@angular/core';
import {AEvent} from "../../../models/a-event";

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})
export class Overview2Component implements OnInit {

  public aEvents: AEvent[];
  displayedColumns: string[] = ['title'];
  HighlightRow: number;
  selectedAEvent: AEvent;


  constructor() {

  }

  ngOnInit(): void {

    this.aEvents = [];

    for (let i = 0; i < 9 ; i++) {
      this.aEvents.push(AEvent.createSampleAEvent(this.nextId()));
    }

    console.log(this.aEvents)
  }

  addEvent(){
    this.aEvents.push(AEvent.createSampleAEvent(this.nextId()));
    this.selectedAEvent = this.aEvents[this.aEvents.length-1];
    this.HighlightRow = this.aEvents.length-1;
  }

  private nextId() {
    if (this.aEvents.length == 0){
      return 20001;
    }else{
      return this.aEvents[this.aEvents.length-1].id+3;
    }
  }

  selected(index: number, aEvent: AEvent) {
    if (this.selectedAEvent == aEvent){
      this.selectedAEvent = null;
      this.HighlightRow = null;
    }else {
      this.selectedAEvent = aEvent;
      this.HighlightRow = index;
    }
  }

  onDelete(deletingAEvent: AEvent){
    for (const aEvent of this.aEvents) {
      if (aEvent.id == deletingAEvent.id){
        const index = this.aEvents.indexOf(aEvent)
        this.aEvents.splice(index, 1);
        this.selectedAEvent = null;
        this.HighlightRow = null;
      }
    }
  }
}
