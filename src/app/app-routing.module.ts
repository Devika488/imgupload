import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { SignindashComponent } from './signup/signindash.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'src/shared/_services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../modules/component/component.module').then(
        (m) => m.ComponentModule
      ),
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
