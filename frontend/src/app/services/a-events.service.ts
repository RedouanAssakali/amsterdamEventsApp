import {Injectable} from '@angular/core';
import {AEvent} from "../models/a-event";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AEventsService {
  public aEvents: AEvent[];

  constructor() {

    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.aEvents.push(AEvent.createSampleAEvent(this.nextId()));
    }
  }

  findAll(): AEvent[] {
    return this.aEvents;
  }

  findById(id: number): AEvent {
    let foundAEvent: AEvent;
    for (let aEvent of this.aEvents) {
      if (aEvent.id == id) {
        foundAEvent = aEvent;
        break;
      }
    }
    return foundAEvent;
  }

  save(aEvent: AEvent): AEvent {
    if (aEvent.id == 0) {
      aEvent.id = this.nextId();
      this.aEvents.push(aEvent);
    } else {
      for (let i = 0; i <this.aEvents.length ; i++) {
        if (this.aEvents[i].id == aEvent.id){
          this.aEvents[i] = aEvent;
          break;
        }
      }
    }
    return aEvent;
  }

  deleteById(id: number): AEvent {
    let foundAEvent: AEvent;
    for (const aEvent of this.aEvents) {
      if (aEvent.id == id) {
        foundAEvent = aEvent;
        const index = this.aEvents.indexOf(foundAEvent)
        this.aEvents.splice(index, 1);
        break;
      }
    }
    return foundAEvent;
  }

  private nextId() {
    if (this.aEvents.length == 0) {
      return 20001;
    } else {
      return this.aEvents[this.aEvents.length - 1].id + 3;
    }
  }
}

