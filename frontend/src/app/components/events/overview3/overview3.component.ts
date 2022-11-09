import { Component, OnInit } from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css']
})
export class Overview3Component implements OnInit {

  displayedColumns: string[] = ['title'];
  HighlightRow: number;
  selectedAEvent: AEvent;
  copySelectedAEvent: AEvent;

  constructor(private aEventService: AEventsService) {

  }

  ngOnInit(): void {}

  addEvent(){
    let newAEvent =  AEvent.createSampleAEvent();
    this.aEventService.save(newAEvent);
    this.selectedAEvent = newAEvent;
    this.HighlightRow = this.aEvents.length-1;
  }

  selected(index: number, aEvent: AEvent) {
    if (this.selectedAEvent == aEvent){
     this.onUnSelect();
    }else {
      this.selectedAEvent = aEvent;
      this.HighlightRow = index;
       this.copySelectedAEvent = AEvent.copyConstructor(this.selectedAEvent);

    }
  }

  onSave(aEvent: AEvent) {
    this.aEventService.save(aEvent);
  }

  get aEvents(): AEvent[] {
    return this.aEventService.findAll()
  }

  onUnSelect(){
    this.selectedAEvent = null;
    this.copySelectedAEvent = null;
    this.HighlightRow = null;
  }
}
