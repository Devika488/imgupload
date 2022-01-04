import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotpagefoundRoutingModule } from './notpagefound-routing.module';
import { NotpageComponent } from './notpage/notpage.component';


@NgModule({
  declarations: [
    NotpageComponent
  ],
  imports: [
    CommonModule,
    NotpagefoundRoutingModule
  ]
})
export class NotpagefoundModule { }
