import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/mainpage/home/home.component";
import {Overview1Component} from "./components/events/overview1/overview1.component";
import {Overview2Component} from "./components/events/overview2/overview2.component";
import {Overview3Component} from "./components/events/overview3/overview3.component";
import {Overview4Component} from "./components/events/overview4/overview4.component";
import {Overview5Component} from "./components/events/overview5/overview5.component";
import {ErrorComponent} from "./components/mainpage/error/error.component";
import {Detail4Component} from "./components/events/detail4/detail4.component";
import {Detail5Component} from "./components/events/detail5/detail5.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'events/overview1', component: Overview1Component},
  {path: 'events/overview2', component: Overview2Component},
  {path: 'events/overview3', component: Overview3Component},
  {path: 'events/overview4', component: Overview4Component, children:[
      {path:':id', component: Detail4Component}
    ]},
  {path: 'events/overview5', component: Overview5Component, children:[
      {path:':id', component: Detail5Component}
    ]},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
