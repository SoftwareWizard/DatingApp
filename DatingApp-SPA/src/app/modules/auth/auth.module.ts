import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './components/register/register.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { AuthEffects } from './ngrx/auth.effects';
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
      EffectsModule.forFeature([AuthEffects]),
   ],
   exports: [],
})
export class AuthModule {}
