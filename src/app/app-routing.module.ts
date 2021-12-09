import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/component/component.module').then(
        (m) => m.ComponentModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../modules/auth/auth.module').then((m) => m.AuthModule),
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
