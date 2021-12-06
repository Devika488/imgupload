import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignindashComponent } from './signindash/signindash.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [{path:'',redirectTo:'login',pathMatch:'full'},{path:"signup",component:SignindashComponent},
{path:"login",component:DashboardComponent},{path:'user-profile/:email',component:UserProfileComponent,canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
