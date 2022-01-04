import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './_services/auth.service';
import { ErrServicesService } from './_services/errservices.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    AuthService,
    ErrServicesService,
    UserService,
    AuthGuard,
    AuthInterceptor,
    ErrorInterceptor,
    JwtInterceptor,
  ],
})
export class SharedModule {}
