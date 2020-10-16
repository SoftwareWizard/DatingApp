import { AuthGuard } from './guards/auth.guard';
import { TextInputComponent } from './components/text-input/text-input.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './ngrx/auth.reducer';

@NgModule({
   declarations: [RegisterComponent, TextInputComponent],
   imports: [
      CommonModule,
      SharedModule,
      AuthRoutingModule,
      StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer, {
         metaReducers: fromAuth.metaReducers,
      }),
   ],
   exports: [],
})
export class AuthModule {}
