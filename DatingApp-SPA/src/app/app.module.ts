import { AdminModule } from './modules/admin/admin.module';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app.routing.module';

import { MembersModule } from './modules/members/members.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';

import {
   ErrorInterceptor,
   JwtInterceptor,
   LoadingInterceptor,
   NavComponent,
} from './core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './core/ngrx/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { MessageApiUrlGenerator } from './modules/message/ngrx/message/message-api.url-generator';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
   AppContainerComponent,
   HomeContainerComponent,
   LikesContainerComponent,
} from './core/container';
import { HomeComponent } from './core/components/home/home.component';
import { LikesComponent } from './core/components/likes/likes.component';

@NgModule({
   declarations: [
      AppContainerComponent,
      HomeContainerComponent,
      LikesContainerComponent,
      HomeComponent,
      NavComponent,
      LikesComponent,
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
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot({}),
      AdminModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
         enabled: environment.production,
      }),
   ],
   exports: [],
   providers: [
      // LocalStorageService,
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
      {
         provide: HttpUrlGenerator,
         useClass: MessageApiUrlGenerator,
      },
   ],
   bootstrap: [AppContainerComponent],
})
export class AppModule {}
