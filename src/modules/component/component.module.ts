import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentRoutingModule } from './component-routing.module';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [UserProfileComponent, HomeComponent, GalleryComponent],
  imports: [
    CommonModule,NgbModule,
    ComponentRoutingModule,ReactiveFormsModule
  ]
})
export class ComponentModule { }
