import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentRoutingModule } from './component-routing.module';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule,ReactiveFormsModule
  ]
})
export class ComponentModule { }
