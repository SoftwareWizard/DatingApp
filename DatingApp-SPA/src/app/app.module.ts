import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { MembersModule } from './modules/members/members.module';
import { ErrorsModule } from './modules/errors/errors.module';

import { AppComponent, HomeComponent, ListsComponent } from './components';

import {
   ErrorInterceptor,
   JwtInterceptor,
   LoadingInterceptor,
   NavComponent,
   RegisterComponent,
} from './core';
import { TextInputComponent } from './core/components/text-input/text-input.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      TextInputComponent,
      ListsComponent,
   ],
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
   ],
   exports: [],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
