import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/_guards/auth.guard';
import { ZonedetailsComponent } from './zonedetails/zonedetails.component';

const routes: Routes = [
  {
    path: 'dash',
    children: [
      { path: 'zone', component: ZonedetailsComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
