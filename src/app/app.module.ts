import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignindashComponent } from './signindash/signindash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaindashComponent } from './maindash/maindash.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignindashComponent,
    MaindashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
