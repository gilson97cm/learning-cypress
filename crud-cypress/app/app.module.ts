import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {appRoutingProviders, routing} from "./app.routing.module";
import {EmployeeService} from "./services/employee.service";
import { HttpModule} from "@angular/http";
import {EmployeesComponent} from "./components/employees/employees.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      routing,
      HttpModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      AboutComponent,
      ContactComponent,
      EmployeesComponent
  ],
  bootstrap:    [ AppComponent ],
    providers: [
        appRoutingProviders,
        EmployeeService,
    ]
})
export class AppModule { }
