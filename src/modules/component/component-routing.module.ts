import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/_services/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [{path:'user-profile/:email',component:UserProfileComponent,canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
