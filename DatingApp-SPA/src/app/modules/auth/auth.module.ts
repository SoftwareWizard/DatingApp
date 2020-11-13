import { RegisterContainerComponent } from './container/register/register.container';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthRoutingModule } from './auth.routing.module';

import { RegisterComponent } from './components/register/register.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { AuthEffects } from './ngrx/auth.effects';
import * as authFacade from './ngrx/auth.facade';
@NgModule({
   declarations: [RegisterComponent, TextInputComponent, RegisterContainerComponent],
   imports: [
      CommonModule,
      SharedModule,
      AuthRoutingModule,
      StoreModule.forFeature(authFacade.featureKey, authFacade.reducer, {
         metaReducers: authFacade.metaReducers,
      }),
      EffectsModule.forFeature([AuthEffects]),
   ],
   exports: [],
})
export class AuthModule {}
