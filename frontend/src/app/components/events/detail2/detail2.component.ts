import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AEvent} from "../../../models/a-event";

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})


export class Detail2Component implements OnInit {
  @Input()
  choosenAEvent: AEvent;

  @Output()
  deletingAEvent = new EventEmitter<AEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteAEvent() {
    this.deletingAEvent.emit(this.choosenAEvent)
  }

}
