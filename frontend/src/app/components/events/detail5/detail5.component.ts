import { Component, OnInit } from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AEventsSbService} from "../../../services/a-events-sb.service";

@Component({
  selector: 'app-detail5',
  templateUrl: './detail5.component.html',
  styleUrls: ['./detail5.component.css']
})
export class Detail5Component implements OnInit {

  disabled: boolean = true;
  choosenAEvent: AEvent;
  selectedAEvent: AEvent;
  constructor(private aEventService: AEventsSbService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

   ngOnInit(): void {
     this.activatedRoute.params.subscribe(async (params: Params) => {
      this.selectedAEvent = await this.aEventService.findById(params['id']);
      await this.aEventService.loadAEvents();
      this.choosenAEvent = await AEvent.copyConstructor(this.selectedAEvent);
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
    this.aEventService.deleteById(this.choosenAEvent.id);
    this.navigateBack();
  }

  saveAEvent() {
    confirm("Are you sure that you want to save this event ?")
    this.aEventService.save(this.choosenAEvent);
    this.aEventService.loadAEvents();
  }

  clearAEvent() {
    confirm("Are you sure that you want to clear all input fields ?")
    this.choosenAEvent.title = null;
    this.choosenAEvent.description = null;
    this.choosenAEvent.status = AEvent.getAEventStatusDraft();
    this.choosenAEvent.isTicketed = false;
    this.choosenAEvent.participationFee = null;
    this.choosenAEvent.maxParticipants = null;
  }

  resetAEvent() {
    confirm("Are you sure that you want to reset all input fields ?")
    this.choosenAEvent = this.selectedAEvent;

  }

  cancelAEvent() {
    confirm("Are you sure that you want to cancel all input fields ?")
    this.navigateBack();
    this.resetAEvent();

  }

  navigateBack(){
    this.router.navigate(['/events/overview5'], {relativeTo: this.activatedRoute});

  }
}
