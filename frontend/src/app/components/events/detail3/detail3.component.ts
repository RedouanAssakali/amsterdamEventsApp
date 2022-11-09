import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AEvent} from "../../../models/a-event";
import {AEventsService} from "../../../services/a-events.service";

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {

  @Input()
  choosenAEvent: AEvent;

  @Input()
  originalAEEvent: AEvent;

  @Output()
  eventEdited: EventEmitter<AEvent> = new EventEmitter<AEvent>();

 @Output()
 unSelect: EventEmitter<AEvent> = new EventEmitter<AEvent>();

  disabled: boolean = true;
  constructor(private aEventService: AEventsService) {

  }

  ngOnInit(): void {
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
    this.unSelect.emit(this.originalAEEvent);
    this.choosenAEvent = null;

  }

  saveAEvent() {
    confirm("Are you sure that you want to save this event ?")
    this.eventEdited.emit(this.choosenAEvent);
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

    this.choosenAEvent = this.originalAEEvent;
  }

  cancelAEvent() {
    confirm("Are you sure that you want to cancel all input fields ?")

    this.resetAEvent();
    this.unSelect.emit(this.originalAEEvent);

  }
}
