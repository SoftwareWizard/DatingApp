import { TextInputComponent } from './components/text-input/text-input.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [RegisterComponent, TextInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  exports: []
})
export class AuthModule { }
