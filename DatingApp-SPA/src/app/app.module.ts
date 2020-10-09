import { JwtInterceptor } from './interceptor/jwt.interceptor.interceptor';

import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

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
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './member-edit/member-edit.component';

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
      MemberListComponent,
      MemberDetailComponent,
      MemberCardComponent,
      MemberEditComponent,
   ],
   imports: [
      AppRoutingModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      SharedModule,
      TabsModule.forRoot(),
      NgxGalleryModule
   ],
   exports: [
     NgxGalleryModule
   ],
   providers: [
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
   bootstrap: [AppComponent],
})
export class AppModule {}
