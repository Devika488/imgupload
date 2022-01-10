import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ZonedetailsComponent } from './zonedetails/zonedetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TariffComponent } from './tariff/tariff.component';

@NgModule({
  declarations: [ ZonedetailsComponent, TariffComponent],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
