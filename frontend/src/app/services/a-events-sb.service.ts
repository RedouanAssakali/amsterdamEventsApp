import { Injectable} from '@angular/core';
import {AEvent} from "../models/a-event";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AEventsSbService {
  public aEvents: AEvent[];
  private url : string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:8084/aevents';
    this.aEvents = [];
    this.loadAEvents();



  }

  private restGetAEvents(): Observable<AEvent[]> {
    return this.httpClient.get<AEvent[]>(this.url)
      .pipe(map((events: AEvent[]) => {
          const aEvents: AEvent[] = [];
          for (const event of events) {
            aEvents.push(AEvent.copyConstructor(event));
          }
          return aEvents;
        }),
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        }));
  }

  addRandomAEvent(aEvent: AEvent): Observable<AEvent> {
    this.loadAEvents();
    return this.restPostAEvent(aEvent);
}

  private restPostAEvent(aEvent: AEvent): Observable<AEvent> {
    this.loadAEvents();
    return this.httpClient.post<AEvent>(this.url, aEvent);
  }

  private restPutAEvent(aEvent: AEvent): Observable<AEvent>{
    this.loadAEvents();
    return this.httpClient.put<AEvent>(`${this.url}/${aEvent.id}`, aEvent)

  }

  private restDeleteAEvent(aEventId: number): void{
     this.httpClient.delete<AEvent>(`${this.url}/${aEventId}`).subscribe(
       (data) =>{
         this.loadAEvents()},
       (error)=>{
         console.log('HTTP Error: Status ' +
           error.status + ' - ' + error.message)
       }
     );
     console.log(`${this.url}/${aEventId}`)
  }

  findAll(): AEvent[] {
    return this.aEvents;
  }

  findById(id: number): AEvent {
    let foundAEvent: AEvent;
    for (const aEvent of this.aEvents) {
      if (aEvent.id == id) {
        foundAEvent = aEvent;
        break;
      }
    }
    return foundAEvent;
  }

  save(aEvent: AEvent): AEvent {
    if (aEvent.id == 0) {
      this.restPostAEvent(aEvent).subscribe(
        (data) =>{console.log(data)}, (error)=>{
          console.log('HTTP Error: Status ' +
            error.status + ' - ' + error.message)
        }
      );    } else {
      for (let i = 0; i < this.aEvents.length; i++) {
        if (this.aEvents[i].id == aEvent.id) {
          this.restPutAEvent(aEvent).subscribe(
            (data) =>{console.log(data)}, (error)=>{
              console.log('HTTP Error: Status ' +
                error.status + ' - ' + error.message)
            }
          );
          console.log("ik ben gewijzigd");
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
        this.restDeleteAEvent(id);
        break;
      }
    }
    return foundAEvent;
  }

  async loadAEvents(){
   await this.restGetAEvents().subscribe(
      (data) => {
        this.aEvents = data;
      },
      (error) => {
        console.log('Error: Status ' + error.status + ' - ' + error.error);
      });
  }

}
