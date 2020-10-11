import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorsModule } from './modules/errors/errors.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, HomeComponent } from './components';
import { MembersModule } from './modules/members/members.module';

import {
   ErrorInterceptor,
   JwtInterceptor,
   LoadingInterceptor,
   NavComponent,
   RegisterComponent,
} from './core';

@NgModule({
   declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent],
   imports: [
      AppRoutingModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
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
