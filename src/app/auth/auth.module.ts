
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule,
    CommonModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthService]
})
export class AuthModule {}
