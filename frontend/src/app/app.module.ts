import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Overview1Component } from './components/events/overview1/overview1.component';
import { Overview2Component } from './components/events/overview2/overview2.component';
import { Detail2Component } from './components/events/detail2/detail2.component';
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import { Overview3Component } from './components/events/overview3/overview3.component';
import { Detail3Component } from './components/events/detail3/detail3.component';
import { ErrorComponent } from './components/mainpage/error/error.component';
import { Overview4Component } from './components/events/overview4/overview4.component';
import { Detail4Component } from './components/events/detail4/detail4.component';
import { Overview5Component } from './components/events/overview5/overview5.component';
import { Detail5Component } from './components/events/detail5/detail5.component';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    Detail2Component,
    Overview3Component,
    Detail3Component,
    ErrorComponent,
    Overview4Component,
    Detail4Component,
    Overview5Component,
    Detail5Component
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
