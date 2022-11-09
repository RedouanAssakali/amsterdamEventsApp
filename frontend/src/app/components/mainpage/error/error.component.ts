import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  route: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.route = '/signup'
  }

}
