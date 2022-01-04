import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpageComponent } from './notpage/notpage.component';

const routes: Routes = [ { path: '**', component: NotpageComponent,pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotpagefoundRoutingModule { }
