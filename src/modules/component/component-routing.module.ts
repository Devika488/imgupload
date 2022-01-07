import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/_guards/auth.guard';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'upload',
        component: UploadimageComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentRoutingModule {}
