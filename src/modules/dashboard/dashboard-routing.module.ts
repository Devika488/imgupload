import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/_guards/auth.guard';
import { NetworkComponent } from './network/network.component';

const routes: Routes = [{ path: 'network', component: NetworkComponent,canActivate:[AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
