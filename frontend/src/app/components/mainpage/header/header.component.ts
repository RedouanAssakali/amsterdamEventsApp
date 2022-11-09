import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  dateToday = this.date.toLocaleString('en-NL', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  constructor() { }
  ngOnInit(): void {
  }
}
