import { Component, OnInit } from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";
import {AEventsSbService} from "../../../services/a-events-sb.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-overview5',
  templateUrl: './overview5.component.html',
  styleUrls: ['./overview5.component.css']
})
export class Overview5Component implements OnInit {

  displayedColumns: string[] = ['title'];
  HighlightRow: number;
  selectedAEvent: AEvent;


  constructor(private aEventService: AEventsSbService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log( );
        if(!isNaN(parseInt(event.url.split('/')[3]))){
          this.checkForParams();
        }
      }
    });
    if (this.selectedAEvent == null){
      this.onUnSelect()
    }
  }

  async checkForParams(){
    await this.activatedRoute.firstChild.params.subscribe((params: Params) => {

      this.selectedAEvent = this.aEventService.findById(params['id']);
      for (let i = 0; i < this.aEvents.length; i++) {
        if (this.aEvents[i] == this.selectedAEvent) {
          this.HighlightRow = i;
        }
      }
    });
  }

 async addEvent() {
    let newAEvent : AEvent =  AEvent.createSampleAEvent(0);
    let savedAEvent = new AEvent();
    await this.aEventService.addRandomAEvent(newAEvent).subscribe(
      async (data) => {
        savedAEvent = data;
        await this.selected(savedAEvent);

      }
      ,
      (error)=>{
        console.log('HTTP Error: Status ' +
          error.status + ' - ' + error.message)
      }

    );



  }

  async selected( aEvent: AEvent) {
    if (aEvent != null && aEvent.id !== this.selectedAEvent?.id) {
      await this.aEventService.loadAEvents();
      await this.router.navigate([  aEvent.id], {relativeTo: this.activatedRoute})
      this.selectedAEvent = aEvent;
      this.HighlightRow = this.aEvents.indexOf(aEvent);
    } else {
      this.onUnSelect()
    }
  }

  onSave(aEvent: AEvent) {
    this.aEventService.save(aEvent);
  }

 get aEvents(): AEvent[] {
    return this.aEventService.findAll()
  }


  onUnSelect() {
    this.router.navigate(['/events/overview5'], {relativeTo: this.activatedRoute})
    this.selectedAEvent = null;
    this.HighlightRow = null;
  }

  // loadAEvents(){
  //    this.aEventService.loadAEvents().subscribe(
  //      (data ) => {
  //       this.aEvents(data); console.log(data);
  //      },
  //      (error)=> console.log("Error: " + error.status + " - " + error.error)
  //    );
  // }
}
