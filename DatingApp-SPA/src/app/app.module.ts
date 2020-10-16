import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { MembersModule } from './modules/members/members.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';

import { AppComponent, HomeComponent, ListsComponent } from './components';

import { ErrorInterceptor, JwtInterceptor, LoadingInterceptor, NavComponent } from './core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './core/ngrx/app.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
   declarations: [AppComponent, NavComponent, HomeComponent, ListsComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      ErrorsModule,
      MembersModule,
      MessageModule,
      AuthModule,
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
      StoreModule.forRoot({}, {}),
      StoreRouterConnectingModule.forRoot({
         stateKey: 'router',
         routerState: RouterState.Minimal,
      }),
      StoreModule.forRoot(reducers, { metaReducers }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      EffectsModule.forRoot([]),
   ],
   exports: [],
   providers: [
      // LocalStorageService,
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
