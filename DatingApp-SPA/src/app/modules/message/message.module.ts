import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageThreadComponent } from './components/message-thread/message-thread.component';


@NgModule({
  declarations: [MessageListComponent, MessageThreadComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule
  ],
  exports: [
    MessageRoutingModule, MessageListComponent, MessageThreadComponent
  ]
})
export class MessageModule { }
