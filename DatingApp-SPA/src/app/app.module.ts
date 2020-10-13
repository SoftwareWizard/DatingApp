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
