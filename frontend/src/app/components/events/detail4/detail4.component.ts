import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit {



    disabled: boolean = true;
   copyChoosenAEvent: AEvent;
   choosenAEvent: AEvent;
  constructor(private aEventService: AEventsService, private router: Router,
  private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params)=>{
    this.choosenAEvent = this.aEventService.findById(params['id']);
    this.copyChoosenAEvent = AEvent.copyConstructor(this.choosenAEvent);
    })

    }


  setDisabled(condition: boolean) {
    this.disabled = condition;
    this.disableButton();
  }

  disableButton() {
    return this.disabled;
  }

  disableDelete() {
    return !this.disabled;
  }

  deleteAEvent() {
    confirm("Are you sure that you want to delete this event ?")
    this.aEventService.deleteById(this.copyChoosenAEvent.id);
    this.navigateBack();



  }

  saveAEvent() {
    confirm("Are you sure that you want to save this event ?")
    this.aEventService.save(this.copyChoosenAEvent);
  }

  clearAEvent() {
    confirm("Are you sure that you want to clear all input fields ?")
    this.copyChoosenAEvent.title = null;
    this.copyChoosenAEvent.description = null;
    this.copyChoosenAEvent.status = AEvent.getAEventStatusDraft();
    this.copyChoosenAEvent.isTicketed = false;
    this.copyChoosenAEvent.participationFee = null;
    this.copyChoosenAEvent.maxParticipants = null;
  }

  resetAEvent() {
    confirm("Are you sure that you want to reset all input fields ?")
    this.copyChoosenAEvent = this.choosenAEvent;

  }

  cancelAEvent() {
    confirm("Are you sure that you want to cancel all input fields ?")
   this.navigateBack();
    this.resetAEvent();

  }


  navigateBack(){
    this.router.navigate(['/events/overview4'], {relativeTo: this.activatedRoute});

  }
}
