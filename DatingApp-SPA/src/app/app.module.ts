import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      TestErrorsComponent,
      NotFoundComponent,
      ServerErrorComponent,
   ],
   imports: [
      AppRoutingModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      SharedModule,
   ],
   providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
   bootstrap: [AppComponent],
})
export class AppModule {}
