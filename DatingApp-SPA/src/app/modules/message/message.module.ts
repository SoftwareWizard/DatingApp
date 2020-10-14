import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';


@NgModule({
  declarations: [MessageListComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule
  ],
  exports: [
    MessageRoutingModule, MessageListComponent
  ]
})
export class MessageModule { }
