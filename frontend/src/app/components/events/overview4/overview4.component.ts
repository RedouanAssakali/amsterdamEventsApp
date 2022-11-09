import {Component, OnInit} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: ['./overview4.component.css']
})
export class Overview4Component implements OnInit {


  displayedColumns: string[] = ['title'];
  HighlightRow: number;
  selectedAEvent: AEvent;


  constructor(private aEventService: AEventsService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.checkForParams();
  //
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       console.log( );
  //       if(!isNaN(parseInt(event.url.split('/')[3]))){
  //         this.checkForParams();
  //       }
  //     }
  //   });
  //
    if (this.selectedAEvent == null){
      this.onUnSelect()
    }

  }

   checkForParams(){
    this.activatedRoute.firstChild.params.subscribe((params: Params) => {

      this.selectedAEvent = this.aEventService.findById(params['id']);
      for (let i = 0; i < this.aEvents.length; i++) {
        if (this.aEvents[i] == this.selectedAEvent) {
          this.HighlightRow = i;
        }
      }
    });

  }

  addEvent() {
    let newAEvent =  AEvent.createSampleAEvent(0);
    this.aEventService.save(newAEvent);
    this.selectedAEvent = newAEvent;
    this.HighlightRow = this.aEvents.length-1;
  }

   selected(index: number, aEvent: AEvent) {
    if (aEvent != null && aEvent.id !== this.selectedAEvent?.id) {
      this.router.navigate([aEvent.id], {relativeTo: this.activatedRoute})
      this.selectedAEvent = aEvent;
      this.HighlightRow = index;
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
    this.router.navigate(['/events/overview4'], {relativeTo: this.activatedRoute})
    this.selectedAEvent = null;
    this.HighlightRow = null;
  }
}
