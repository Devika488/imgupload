import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignindashComponent } from './signindash/signindash.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [{path:'',redirectTo:'login',pathMatch:'full'},{path:"signup",component:SignindashComponent},
{path:"login",component:DashboardComponent},{path:'user-profile',component:UserProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
